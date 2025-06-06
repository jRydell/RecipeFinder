import axios from "axios";
import { useAuthStore } from "../../stores/auth.store";

// Environment detection
const isDevelopment = import.meta.env.DEV;
const API_URL = isDevelopment ? "http://localhost:3000" : "";

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

export type ApiResponse<T = unknown> = {
  data: T | null;
  error: string | null;
  message?: string;
};

type ApiRequestData = Record<string, unknown>;

export const ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  SAVED_RECIPES: "/api/my-recipes",
  REVIEWS: "/api/reviews",
};

// Auth token
const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

type ErrorResponse = {
  message?: string;
};

const handleError = (error: unknown): string => {
  // Axios errors with response
  if (axios.isAxiosError(error) && error.response) {
    const errorData = error.response.data as ErrorResponse;
    if (isDevelopment) {
      console.error("API Error:", error.response.status, errorData);
    }
    return errorData.message || `Error: ${error.response.status}`;
  }

  // Standard JS errors
  if (error instanceof Error) {
    if (isDevelopment) {
      console.error("JS Error:", error.message);
    }
    return error.message;
  }

  if (isDevelopment) {
    console.error("Unknown error:", error);
  }
  return "Unknown error";
};

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await client.get<T>(endpoint, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  },

  post: async <T>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await client.post<T>(endpoint, data, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  },

  put: async <T>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await client.put<T>(endpoint, data, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await client.delete<T>(endpoint, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  },
};
