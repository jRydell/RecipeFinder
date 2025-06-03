import { create } from "zustand";
import { recipeService, SavedRecipe } from "@/api/services/recipe-service";
import { persist } from "zustand/middleware";

type SavedRecipesState = {
  savedRecipes: SavedRecipe[];
  loading: boolean;
  error: string | null;

  fetchSavedRecipes: () => Promise<void>;
  saveRecipe: (
    mealId: string,
    mealName: string,
    mealThumb: string
  ) => Promise<void>;
  removeSavedRecipe: (mealId: string) => Promise<void>;
  isSaved: (mealId: string) => boolean;
  setSavedRecipes: (recipes: SavedRecipe[]) => void;
  setError: (error: string | null) => void;
};

export const useSavedRecipesStore = create<SavedRecipesState>()(
  persist(
    (set, get) => ({
      savedRecipes: [],
      loading: false,
      error: null,

      setSavedRecipes: (recipes) => set({ savedRecipes: recipes }),
      setError: (error) => set({ error }),

      fetchSavedRecipes: async () => {
        set({ loading: true, error: null });
        const { data, error } = await recipeService.getSavedRecipes();
        if (error) {
          set({ error, loading: false });
        } else {
          set({ savedRecipes: data || [], error: null, loading: false });
        }
      },

      saveRecipe: async (mealId, mealName, mealThumb) => {
        set({ loading: true, error: null });
        const { error } = await recipeService.saveRecipe(
          mealId,
          mealName,
          mealThumb
        );
        if (error) {
          set({ error, loading: false });
        } else {
          await get().fetchSavedRecipes();
        }
      },

      removeSavedRecipe: async (mealId) => {
        set({ loading: true, error: null });
        const { error } = await recipeService.deleteSavedRecipe(mealId);
        if (error) {
          set({ error, loading: false });
        } else {
          await get().fetchSavedRecipes();
        }
      },

      isSaved: (mealId) => {
        return get().savedRecipes.some((recipe) => recipe.meal_id === mealId);
      },
    }),
    {
      name: "saved-recipes-store",
      partialize: (state) => ({ savedRecipes: state.savedRecipes }),
    }
  )
);
