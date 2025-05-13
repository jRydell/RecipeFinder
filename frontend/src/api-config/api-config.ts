import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

// Environment detection
const isDevelopment = import.meta.env.DEV;
const API_URL = isDevelopment ? "http://localhost:3000" : "";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

export type ApiResponse<T = unknown> = {
  data: T | null;
  error: string | null;
};

type ApiRequestData = Record<string, unknown>;

export const ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  SAVED_RECIPES: "/api/saved-recipes",
  RATINGS: "/api/ratings",
  COMMENTS: "/api/comments",
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
  if (axios.isAxiosError(error) && error.response) {
    const errorData = error.response.data as ErrorResponse;
    return errorData.message || `Error: ${error.response.status}`;
  }

  return error instanceof Error ? error.message : "Unknown error";
};

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(endpoint, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      console.error(`API Error:`, error);
      return { data: null, error: handleError(error) };
    }
  },

  post: async <T>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(endpoint, data, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      console.error(`API Error:`, error);
      return { data: null, error: handleError(error) };
    }
  },

  put: async <T>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T>(endpoint, data, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      console.error(`API Error:`, error);
      return { data: null, error: handleError(error) };
    }
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(endpoint, {
        headers: { ...getAuthHeader() },
      });
      return { data: response.data, error: null };
    } catch (error) {
      console.error(`API Error:`, error);
      return { data: null, error: handleError(error) };
    }
  },
};
