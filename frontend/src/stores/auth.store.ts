import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService, User, AuthResponse } from "../api/services/auth-service";
import { useSavedRecipesStore } from "./savedRecipes.store";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<{ data: AuthResponse | null; error: string | null }>;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ data: AuthResponse | null; error: string | null }>;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      login: async (email: string, password: string) => {
        set({ loading: true });
        const { data, error } = await authService.login(email, password);

        if (data) {
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
        }
        set({ loading: false });
        return { data, error };
      },
      register: async (username: string, email: string, password: string) => {
        set({ loading: true });

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
        }
        set({ loading: false });
        return { data, error };
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        useSavedRecipesStore.getState().clearSavedRecipes();
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
