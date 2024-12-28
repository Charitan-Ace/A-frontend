import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class APIClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL = "/") {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      withCredentials: true,
    });

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

  // PUT request
  async put<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(path, data, config);
    return response.data;
  }

  // DELETE request
  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(path, config);
    return response.data;
  }
}
