import axios from "axios";

// Environment detection
const PRODUCTION_HOSTS = ["83.252.101.28"];
const isDevelopment = !PRODUCTION_HOSTS.includes(window.location.hostname);

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
  HEALTH: isDevelopment ? "/health" : "/api/health",
  TEST_DB: isDevelopment ? "/test-db" : "/api/test-db",
  REGISTER: isDevelopment ? "/register" : "/api/register",
  LOGIN: isDevelopment ? "/register" : "/api/register",
};

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get(endpoint);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return {
        data: null,
        error: `Failed to fetch data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  post: async <T>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post(endpoint, data);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      return {
        data: null,
        error: `Failed to save data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  put: async <T>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put(endpoint, data);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
      return {
        data: null,
        error: `Failed to update data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete(endpoint);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error(`Error deleting at ${endpoint}:`, error);
      return {
        data: null,
        error: `Failed to delete data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },
};
