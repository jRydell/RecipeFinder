import { create } from "zustand";
import { recipeService, SavedRecipe } from "@/api/services/recipe-service";

type SavedRecipesState = {
  savedRecipes: SavedRecipe[];
  loading: boolean;
  error: string | null;
  initialLoad: boolean;

  fetchSavedRecipes: () => Promise<void>;
  saveRecipe: (
    mealId: string,
    mealName: string,
    mealThumb: string
  ) => Promise<void>;
  removeSavedRecipe: (mealId: string) => Promise<void>;
  isSaved: (mealId: string) => boolean;
  setInitialLoad: (value: boolean) => void;
  setSavedRecipes: (recipes: SavedRecipe[]) => void;
  setError: (error: string | null) => void;
};

export const useSavedRecipesStore = create<SavedRecipesState>((set, get) => ({
  savedRecipes: [],
  loading: false,
  error: null,
  initialLoad: true,

  setSavedRecipes: (recipes) => set({ savedRecipes: recipes }),
  setError: (error) => set({ error }),
  setInitialLoad: (value) => set({ initialLoad: value }),

  fetchSavedRecipes: async () => {
    set({ loading: true, error: null });
    const { data, error } = await recipeService.getSavedRecipes();
    if (error) {
      set({ error, loading: false });
    } else {
      set({ savedRecipes: data || [], error: null, loading: false });
      set({ initialLoad: false });
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
}));
