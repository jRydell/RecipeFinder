import { api, ENDPOINTS, ApiResponse } from "../config/api-config";

export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> => {
    return await api.post<AuthResponse>(ENDPOINTS.LOGIN, {
      email,
      password,
    });
  },

  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> => {
    return await api.post<AuthResponse>(ENDPOINTS.REGISTER, {
      username,
      email,
      password,
    });
  },

  // Validate the current auth token (can be expanded later)

  /*   validateToken: async (token: string) => {
    // This is a placeholder. In a real implementation, you might call a token validation endpoint
    return Promise.resolve({ valid: !!token });
  }, */
};
