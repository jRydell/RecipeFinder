import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type ApiResponse = {
  message?: string;
  success?: boolean;
};

export const ENDPOINTS = {
  HEALTH: "/health",
  TEST_DB: "/test-db",
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export const api = {
  get: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(endpoint);
    return response.data;
  },

  post: async <T = ApiResponse>(endpoint: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
    return response.data;
  },

  put: async <T = ApiResponse>(endpoint: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
    return response.data;
  },

  delete: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(endpoint);
    return response.data;
  },
};
