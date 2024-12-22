import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class APIClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL = "/") {
    // Initialize the axios instance
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000, // Optional: Set a timeout for requests
      withCredentials: true, // Optional: Include credentials by default
    });

    // Add interceptors if needed
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  // Handle success response
  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  // Handle errors
  private handleError(error: any) {
    // Standardize error handling logic
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${error.response.data.message || "Unknown Error"}`
      );
    } else if (error.request) {
      throw new Error("No response received from server.");
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  // GET request
  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(path, config);
    return response.data;
  }

  // POST request
  async post<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(path, data, config);
    return response.data;
  }
}
