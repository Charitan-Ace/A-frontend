import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import AuthService from "./auth/service/auth-service";

export default class APIClient {
  private axiosInstance: AxiosInstance;
  readonly auth: AuthService;

  constructor(baseURL = "/") {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Setup interceptors
    this.setupInterceptors();

    // Initialize auth service
    this.auth = new AuthService(this);
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can add auth token here
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Handle unauthorized
              // this.auth.logout();
              break;
            case 403:
              // Handle forbidden
              break;
            // Add more cases as needed
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      path,
      config
    );
    return response.data;
  }

  async post<T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      path,
      data,
      config
    );
    return response.data;
  }
}
