import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api, ENDPOINTS } from "../api/config/api-config";

type AuthResponse = {
  user: User;
  token: string;
};

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string | null }>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string | null }>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post<AuthResponse>(ENDPOINTS.LOGIN, {
            email,
            password,
          });
          if (response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
            });
            return { success: true, error: null };
          }
          return { success: false, error: response.error || "Login failed" };
        } catch (error) {
          console.error("Unexpected login error:", error);
          return { success: false, error: "An unexpected error occurred" };
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post<AuthResponse>(ENDPOINTS.REGISTER, {
            username,
            email,
            password,
          });
          if (response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
            });
            return { success: true, error: null };
          }

          return {
            success: false,
            error: response.error || "Registration failed",
          };
        } catch (error) {
          console.error("Unexpected registration error:", error);
          return { success: false, error: "An unexpected error occurred" };
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state: AuthState) => ({
        user: state.user,
        token: state.token,
      }),
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        // When store is rehydrated from localStorage, set isAuthenticated based on token
        if (state && state.token) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
