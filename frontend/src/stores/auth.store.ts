import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService, User } from "../api/services/auth-service";

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
        const { data, error } = await authService.login(email, password);

        if (data) {
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
          set({ isLoading: false });
          return { success: true, error: null };
        }

        set({ isLoading: false });
        return { success: false, error };
      },
      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });

        const { data, error } = await authService.register(
          username,
          email,
          password
        );

        if (data) {
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
          set({ isLoading: false });
          return { success: true, error: null };
        }

        set({ isLoading: false });
        return {
          success: false,
          error: error,
        };
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
        // When store is rehydrated from sessionStorage, set isAuthenticated based on token
        if (state && state.token) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
