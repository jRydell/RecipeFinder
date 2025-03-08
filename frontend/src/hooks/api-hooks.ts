import { useState, useEffect, useCallback } from "react";
import { api } from "../api-config/api-config";

/**
 * Base hook that provides state management and API request handling
 * for all HTTP methods (GET, POST, PUT, DELETE)
 *
 * @param method - HTTP method to use ('get', 'post', 'put', 'delete')
 * @param endpoint - API endpoint to call
 * @param payload - Data to send with POST/PUT requests
 * @param options - Configuration options for the hook
 * @returns Object with data, loading state, error state, and control functions
 */
export const useApi = <T>(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  payload?: any,
  options: {
    immediate?: boolean; // Whether to call the API immediately when component mounts
    dependencies?: any[]; // Additional values that should trigger a re-fetch when changed
  } = { immediate: true, dependencies: [] }
) => {
  // State management for API operations
  const [data, setData] = useState<T | null>(null); // Stores the API response data
  const [loading, setLoading] = useState<boolean>(options.immediate ?? true); // Tracks if request is in progress
  const [error, setError] = useState<string | null>(null); // Stores any error messages

  /**
   * Primary function to execute the API request
   * Wrapped in useCallback to maintain stable reference between renders
   * Only recreates if method, endpoint or payload changes
   */
  const execute = useCallback(
    async (customPayload?: any) => {
      try {
        setLoading(true);
        setError(null);

        let response;
        // Call the appropriate API method based on the 'method' parameter
        switch (method) {
          case "get":
            response = await api.get<T>(endpoint);
            break;
          case "post":
            // Use customPayload if provided, otherwise use the default payload
            response = await api.post<T>(endpoint, customPayload || payload);
            break;
          case "put":
            response = await api.put<T>(endpoint, customPayload || payload);
            break;
          case "delete":
            response = await api.delete<T>(endpoint);
            break;
        }

        setData(response);
        return response;
      } catch (err) {
        // Set user-friendly error message for UI display
        setError("Request failed");
        throw err; // Allow error to propagate for custom handling if needed
      } finally {
        // Always set loading to false when done, regardless of success/failure
        setLoading(false);
      }
    },
    [method, endpoint, payload]
  );

  /**
   * Effect hook that calls the API when the component mounts
   * or when dependencies change, but only if immediate is true
   */
  useEffect(() => {
    if (options.immediate) {
      execute();
    }
    // Using custom dependencies array provided in options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, options.dependencies || []);

  // Return values and functions for components to use
  return { data, loading, error, execute, setData };
};

/**
 * Hook for making GET requests - simplified interface for useApi
 *
 * @param endpoint - API endpoint to call
 * @param options - Optional configuration (immediate, dependencies)
 */
export const useGet = <T>(
  endpoint: string,
  options?: { immediate?: boolean; dependencies?: any[] }
) => {
  return useApi<T>("get", endpoint, undefined, options);
};

/**
 * Hook for making POST requests - simplified interface for useApi
 * Sets immediate to false by default since POST requests are usually
 * triggered by user actions rather than on component mount
 *
 * @param endpoint - API endpoint to call
 * @param payload - Data to send in the request body
 * @param options - Optional configuration (immediate, dependencies)
 */
export const usePost = <T>(
  endpoint: string,
  payload?: any,
  options?: { immediate?: boolean; dependencies?: any[] }
) => {
  return useApi<T>("post", endpoint, payload, { immediate: false, ...options });
};

/**
 * Hook for making PUT requests - simplified interface for useApi
 * Sets immediate to false by default, as PUT requests are typically
 * action-triggered rather than automatic
 *
 * @param endpoint - API endpoint to call
 * @param payload - Data to send in the request body
 * @param options - Optional configuration (immediate, dependencies)
 */
export const usePut = <T>(
  endpoint: string,
  payload?: any,
  options?: { immediate?: boolean; dependencies?: any[] }
) => {
  return useApi<T>("put", endpoint, payload, { immediate: false, ...options });
};

/**
 * Hook for making DELETE requests - simplified interface for useApi
 * Sets immediate to false by default, as DELETE operations are usually
 * triggered by user confirmation rather than on mount
 *
 * @param endpoint - API endpoint to call
 * @param options - Optional configuration (immediate, dependencies)
 */
export const useDelete = <T>(
  endpoint: string,
  options?: { immediate?: boolean; dependencies?: any[] }
) => {
  return useApi<T>("delete", endpoint, undefined, {
    immediate: false,
    ...options,
  });
};
