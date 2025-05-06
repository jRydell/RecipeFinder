import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

// Environment detection
const PRODUCTION_HOSTS = ["83.252.108.161"];
const isDevelopment = !PRODUCTION_HOSTS.includes(window.location.hostname);

const API_URL = isDevelopment ? "http://localhost:3000" : "";

// Function to get auth token from store
const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Base axios instance
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
  HEALTH: "/api/health",
  TEST_DB: "/api/test-db",
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  SAVED_RECIPES: "/api/saved-recipes",
  RATINGS: "/api/ratings",
  COMMENTS: "/api/comments",
};

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get(endpoint, {
        headers: {
          ...getAuthHeader(),
        },
      });
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
      const response = await apiClient.post(endpoint, data, {
        headers: {
          ...getAuthHeader(),
        },
      });
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      return {
        data: null,
        error: `Failed to submit data: ${
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
      const response = await apiClient.put(endpoint, data, {
        headers: {
          ...getAuthHeader(),
        },
      });
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
      const response = await apiClient.delete(endpoint, {
        headers: {
          ...getAuthHeader(),
        },
      });
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
