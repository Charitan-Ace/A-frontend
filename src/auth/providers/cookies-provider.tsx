import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

import * as authHelper from "../_helper.ts";
import { CharityModel, DonorModel, UserModel } from "@/type/auth/model.ts";
import { getMe, login, register } from "@/api/auth";
import { RegisterInput } from "@/api/auth/schema/signup-schema.ts";
import { APIResponse } from "@/api/axios.ts";
import { LoginInput } from "@/api/auth/schema/login-schema.ts";
import { encryptionKey } from "@/api/auth/service/get-key.ts";
import { JWK } from "jose";

interface AuthContextProps {
  isLoading: boolean;
  auth: CharityModel | DonorModel | undefined;
  saveAuth: (auth: CharityModel | DonorModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  signIn: (loginInfo: LoginInput) => Promise<void>;
  loginWithGoogle?: () => Promise<void>;
  loginWithFacebook?: () => Promise<void>;
  signUp: (something: RegisterInput) => Promise<void>;
  getUser: () => Promise<APIResponse<UserModel>>;
  logout: () => void;
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
        throw new Error("JWK key is not defined");
      }
      const { data } = await login(loginInfo, jwkKey);
      saveAuth(data);
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  const signUp = async (registerInfo: RegisterInput) => {
    if (!jwkKey) {
      throw new Error("JWK key is not defined");
    }
    const { data } = await register(registerInfo, jwkKey);
    // if (error) {
    //   saveAuth(undefined);
    //   throw new Error(`Error ${error}`);
    // }

    if (!data) {
      saveAuth(undefined);
      throw new Error(`Something went wrong while signing up!`);
    }

    saveAuth(auth);
    const { data: userData } = await getUser();

    setCurrentUser(userData);
  };

  const getUser = async () => {
    return await getMe();
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
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
