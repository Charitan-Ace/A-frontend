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
import { getMe, login, register } from "@/api/auth";
import { RegisterInput } from "@/api/signup/schema/signup-schema.ts";
import { APIResponse } from "@/api/axios.ts";
import { LoginInput } from "@/api/login/schema/login-schema.ts";
import { encryptionKey } from "@/api/auth/service/get-key.ts";
import { JWK } from "jose";

interface AuthContextProps {
  isLoading: boolean;
  auth: CharityModel | DonorModel | undefined;
  saveAuth: (auth: CharityModel | DonorModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  signIn: (loginInfo: LoginInput) => Promise<BaseModel | undefined>;
  loginWithGoogle?: () => Promise<void>;
  loginWithFacebook?: () => Promise<void>;
  signUp: (signupInfo: RegisterInput) => Promise<BaseModel | undefined>;
  getUser: () => Promise<APIResponse<UserModel>>;
  logout: () => Promise<BaseModel | undefined>;
  verify: () => Promise<void>;
  jwkKey: JWK | undefined;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<any | undefined>(authHelper.getCookieAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const [jwkKey, setJwkKey] = useState<JWK | undefined>();

  const verify = async () => {
    if (!auth) return;
    try {
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch {
      saveAuth(undefined);
      setCurrentUser(undefined);
    }
  };

  useEffect(() => {
    verify().finally(() => {
      setLoading(false);
    });
    getKey();
  }, []);

  // TODO: change to correct getMe
  useEffect(() => {
    getUser();
  }, [jwkKey]);

  const getKey = async () => {
    const key = await encryptionKey();
    setJwkKey(key);
  };

  const saveAuth = (auth: any | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setCookieAuth(auth);
    } else {
      authHelper.removeCookieAuth();
    }
  };

  const signIn = async (loginInfo: LoginInput) => {
    try {
      if (!jwkKey) {
        console.log("JWK key is not defined");
        throw new Error("JWK key is not defined");
      }
      const response: APIResponse<BaseModel> = await login(loginInfo, jwkKey);
      if (response.error) {
        throw new Error(`Error ${response.error}`);
      }

      await getUser();
      return response;
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  const signUp = async (registerInfo: RegisterInput) => {
    if (!jwkKey) {
      throw new Error("JWK key is not defined");
    }
    const response: APIResponse<BaseModel> = await register(
      registerInfo,
      jwkKey
    );

    return response;
  };

  // TODO later change to correct getme (currently is for testing)
  const getUser = async () => {
    if (!jwkKey) {
      throw new Error("JWK key is not defined");
    }
    const response = await getMe(
      { email: "hello@charitan.com", password: "password" },
      jwkKey
    );

    return response;
  };

  const logout = async (): Promise<BaseModel | undefined> => {
    if (!jwkKey) {
      throw new Error("JWK key is not defined");
    }

    const response = await logout();

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
        jwkKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
