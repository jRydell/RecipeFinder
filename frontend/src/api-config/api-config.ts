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

type ApiResponse = {
  message?: string;
  success?: boolean;
};

type ApiRequestData = Record<string, unknown>;

export const ENDPOINTS = {
  HEALTH: isDevelopment ? "/health" : "/api/health",
  TEST_DB: isDevelopment ? "/test-db" : "/api/test-db",
};

export const api = {
  get: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw new Error(
        `API request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  post: async <T = ApiResponse>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<T> => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw new Error(
        `API request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  put: async <T = ApiResponse>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<T> => {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
      throw new Error(
        `API request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  delete: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error deleting at ${endpoint}:`, error);
      throw new Error(
        `API request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },
};
