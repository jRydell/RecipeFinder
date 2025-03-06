import axios, { AxiosResponse } from "axios";

// MORE RELIABLE ENVIRONMENT DETECTION
// This explicitly checks for your production server IP/domain
const PRODUCTION_HOSTS = ["83.252.101.28"]; // Add your server IP/hostname here

// Determine environment based on host
const isDevelopment = !PRODUCTION_HOSTS.includes(window.location.hostname);

// Debug logging to verify detection
console.log("Current hostname:", window.location.hostname);
console.log("Is development environment?", isDevelopment);

// Set base URL appropriately - empty for production (will use relative URLs)
const API_URL = isDevelopment ? "http://localhost:3000" : "";

console.log("API Base URL:", API_URL);
console.log(
  "Health endpoint will be:",
  isDevelopment ? `${API_URL}/health` : "/api/health"
);

// Create axios instance with the right base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add a reasonable timeout
  timeout: 8000,
});

// Define API response type for better typing
type ApiResponse = {
  message?: string;
  success?: boolean;
};

// Configure endpoints with environment-aware paths
export const ENDPOINTS = {
  HEALTH: isDevelopment ? "/health" : "/api/health",
  TEST_DB: isDevelopment ? "/test-db" : "/api/test-db",
  // Add other endpoints here following the same pattern
};

// Add request logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL || ""}${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response/error logging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status
      console.error(
        `API error ${error.response.status} from ${error.config.url}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error(`No response received from ${error.config.url}`);
    } else {
      // Something else happened
      console.error(
        `Error with request to ${error.config?.url}:`,
        error.message
      );
    }
    return Promise.reject(error);
  }
);

// Export API methods that use the configured client
export const api = {
  get: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`GET request failed for ${endpoint}:`, error);
      throw error;
    }
  },

  post: async <T = ApiResponse>(endpoint: string, data: any): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`POST request failed for ${endpoint}:`, error);
      throw error;
    }
  },

  put: async <T = ApiResponse>(endpoint: string, data: any): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`PUT request failed for ${endpoint}:`, error);
      throw error;
    }
  },

  delete: async <T = ApiResponse>(endpoint: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`DELETE request failed for ${endpoint}:`, error);
      throw error;
    }
  },
};
