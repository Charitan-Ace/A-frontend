import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

import * as authHelper from "../_helper.ts";
import {
  BaseModel,
  CharityModel,
  DonorModel,
  UserModel,
} from "@/type/auth/model.ts";
import { getMe, login, register, logoutMe } from "@/api/auth";
import { RegisterInput } from "@/api/signup/schema/signup-schema.ts";
import { APIResponse } from "@/api/axios.ts";
import { LoginInput } from "@/api/login/schema/login-schema.ts";

interface AuthContextProps {
  isLoading: boolean;
  auth: CharityModel | DonorModel | undefined;
  saveAuth: (auth: CharityModel | DonorModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  signIn: (
    loginInfo: LoginInput
  ) => Promise<APIResponse<BaseModel> | undefined>;
  loginWithGoogle?: () => Promise<void>;
  loginWithFacebook?: () => Promise<void>;
  signUp: (
    signupInfo: RegisterInput
  ) => Promise<APIResponse<BaseModel> | undefined>;
  getUser: () => Promise<APIResponse<UserModel>>;
  logout: () => Promise<APIResponse<BaseModel> | undefined>;
  verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<BaseModel | undefined>();
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  const verify = async () => {
    try {
      const { data } = await getUser();
      setAuth(data);
      setCurrentUser(data);
    } catch {
      saveAuth(undefined);
      setCurrentUser(undefined);
    }
  };

  useEffect(() => {
    verify().finally(() => {
      setLoading(false);
    });
  }, []);

  const saveAuth = (auth: any | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setCookieAuth(auth);
    } else {
      authHelper.removeCookieAuth();
    }
  };

  const signIn = async (loginInfo: LoginInput) => {
    const response = await login(loginInfo);

    if (response.status == 200) {
      window.location.href = "/profile";
    }

    return response;
  };

  const signUp = async (registerInfo: RegisterInput) => {
    const response = await register(registerInfo);
    console.log(222, "signup response", response);

    if (response.status == 200) {
      window.location.href = "/auth/login";
    }

    return response;
  };

  const getUser = async () => {
    const response = await getMe();
    console.log(333, "getMe response", response);

    if (response.status == 200) {
      setAuth(response.data);
    }

    return response;
  };

  const logout = async () => {
    const response = await logoutMe();

    if (response.status == 200) {
      window.location.href = "/auth/login";
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: loading,
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        signIn,
        signUp,
        getUser,
        logout,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
