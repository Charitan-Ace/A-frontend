import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

import * as authHelper from "../_helper.ts";
import { type AuthModel, type UserModel } from "@/type/auth/model.ts";
import { getMe, login, register } from "@/api/auth";
import { RegisterInput } from "@/api/auth/schema/register.ts";
import { APIResponse } from "@/api/axios.ts";
import { LoginInput } from "@/api/auth/schema/login.ts";

interface AuthContextProps {
  isLoading: boolean;
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  signIn: (loginInfo: LoginInput) => Promise<void>;
  loginWithGoogle?: () => Promise<void>;
  loginWithFacebook?: () => Promise<void>;
  signUp: (something: RegisterInput) => Promise<void>;
  getUser: () => Promise<APIResponse<UserModel>>;
  logout: () => void;
  verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthModel | undefined>(
    authHelper.getCookieAuth(),
  );
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

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
  }, []);

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setCookieAuth(auth);
    } else {
      authHelper.removeCookieAuth();
    }
  };

  const signIn = async (loginInfo: LoginInput) => {
    try {
      const { data: auth } = await login(loginInfo);
      saveAuth(auth);
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  const signUp = async (something: RegisterInput) => {
    const { data, error } = await register(something);
    if (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
