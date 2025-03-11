import axios, { AxiosResponse, AxiosError } from "axios";

// Environment detection based on hostname
const PRODUCTION_HOSTS = ["83.252.101.28"];
const isDevelopment = !PRODUCTION_HOSTS.includes(window.location.hostname);

// Set base URL appropriately - empty for production (uses relative URLs)
const API_URL = isDevelopment ? "http://localhost:3000" : "";

// Create axios instance with configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

// Define API response type for better typing
type ApiResponse = {
  message?: string;
  success?: boolean;
};

type ApiRequestData = Record<string, unknown>;

// Configure endpoints with environment-aware paths
export const ENDPOINTS = {
  HEALTH: isDevelopment ? "/health" : "/api/health",
  TEST_DB: isDevelopment ? "/test-db" : "/api/test-db",
};

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL || ""}${config.url}`);
    return config;
  },
  (error: Error) => {
    console.error("Request error:", error);
    return Promise.reject(new Error(`Request failed: ${error.message}`));
  }
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error: unknown) => {
    // Type guard for AxiosError
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error(
        `API error ${axiosError.response.status} from ${
          axiosError.config?.url || "unknown endpoint"
        }`
      );
    } else if (axiosError.request) {
      console.error(
        `No response received from ${
          axiosError.config?.url || "unknown endpoint"
        }`
      );
    } else {
      console.error(
        `Error with request to ${
          axiosError.config?.url || "unknown endpoint"
        }:`,
        axiosError.message || "Unknown error"
      );
    }
    return Promise.reject(
      new Error(`API request failed: ${axiosError.message || "Unknown error"}`)
    );
  }
);

export const api = {
  get: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(endpoint);
    return response.data;
  },

  post: async <T = ApiResponse>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
    return response.data;
  },

  put: async <T = ApiResponse>(
    endpoint: string,
    data: ApiRequestData
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
    return response.data;
  },

  delete: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(endpoint);
    return response.data;
  },
};
