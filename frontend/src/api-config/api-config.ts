import axios, { AxiosResponse } from "axios";

// Automatically detect if we're in development or production environment
const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Base URL - use localhost in development, relative paths in production
const API_URL = isDevelopment ? "http://localhost:3000" : "";

// Create axios instance with appropriate base URL
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

// Define endpoints with environment-aware paths
export const ENDPOINTS = {
  // In development: /health (baseURL adds http://localhost:3000)
  // In production: /api/health (no baseURL, so it's relative to the current domain)
  HEALTH: isDevelopment ? "/health" : "/api/health",
  TEST_DB: isDevelopment ? "/test-db" : "/api/test-db",
};

// Log configuration for debugging
console.log(
  `API configured for ${isDevelopment ? "development" : "production"} mode`
);
console.log(`Base URL: ${API_URL}`);
console.log(
  `Health endpoint: ${
    isDevelopment ? API_URL + ENDPOINTS.HEALTH : ENDPOINTS.HEALTH
  }`
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Export API methods that use the configured client
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
