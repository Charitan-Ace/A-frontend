export const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_KEY_URL = `${API_URL}/.well-known/jwk`;
export const LOGIN_URL = `${API_URL}/api/auth/login`;
export const REGISTER_URL = `${API_URL}/api/auth/register`;
export const FORGOT_PASSWORD_URL = `${API_URL}/forgot-password`;
export const RESET_PASSWORD_URL = `${API_URL}/reset-password`;

export const GET_ME_URL = `${API_URL}/api/profile/donor/info`;
