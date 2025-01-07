import { getCookieAuth } from "../auth/_helper.ts";

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface APIResponse<TResponse> {
  data?: TResponse;
  status: number;
  error?: string;
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getCookieAuth();
      console.log(333, auth);

      if (auth?.access_token) {
        config.headers.Authorization = `Bearer ${auth.access_token}`;
      }
      console.log(444, config);
      return config;
    },
    async (err: any) => await Promise.reject(err)
  );
}
