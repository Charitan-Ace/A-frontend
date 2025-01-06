import { getCookie, setCookie, Cookies, removeCookie } from "typescript-cookie";
import { type AuthModel } from "../type/auth/model.ts";
// const AUTH_LOCAL_STORAGE_KEY = `${import.meta.env.VITE_APP_NAME}-auth-v${
//     import.meta.env.VITE_APP_VERSION
// }`;

const AUTH_COOKIE_STORAGE_KEY = "x-token";

const getCookieAuth = (): AuthModel | undefined => {
  console.log(1, AUTH_COOKIE_STORAGE_KEY);
  if (!Cookies) {
    console.error("COOKIE IS NOT READY");
    return undefined;
  }

  const authToken = getCookie(AUTH_COOKIE_STORAGE_KEY);
  if (!authToken) {
    return undefined;
  }
  console.log(111, authToken);
  try {
    const authInfo = JSON.parse(authToken) as AuthModel;
    console.log(222, authInfo);
    if (!authInfo) {
      return undefined;
    }
    return authInfo;
  } catch (error) {
    console.error("AUTH COOKIE PARSE ERROR", error);
    return undefined;
  }
};

const setCookieAuth = async (authModel: AuthModel) => {
  if (!Cookies) {
    console.error("COOKIE IS NOT READY");
    return;
  }

  console.log(444, authModel);
  console.log(555, JSON.stringify(authModel));

  const authToken = await JSON.stringify(authModel);

  setCookie(AUTH_COOKIE_STORAGE_KEY, authToken, {
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  });
};

const removeCookieAuth = () => {
  if (!Cookies) {
    console.error("COOKIE IS NOT READY");
    return;
  }
  try {
    removeCookie(AUTH_COOKIE_STORAGE_KEY, {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    });
  } catch (error) {
    console.error("AUTH COOKIE STORAGE REMOVE ERROR", error);
  }
};

export {
  AUTH_COOKIE_STORAGE_KEY,
  getCookieAuth,
  removeCookieAuth,
  setCookieAuth,
};
