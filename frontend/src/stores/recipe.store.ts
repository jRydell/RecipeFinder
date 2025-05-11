import { create } from "zustand";
import { Meal } from "../services/mealdb-service";

type RecipeState = {
  recipe: Meal | null;
  setRecipe: (recipe: Meal | null) => void;
};

export const useRecipeStore = create<RecipeState>((set) => ({
  recipe: null,
  setRecipe: (recipe: Meal | null) =>
    set({
      recipe: recipe,
    }),
}));
