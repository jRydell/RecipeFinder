import { api, ENDPOINTS } from "../api-config/api-config";

export type SavedRecipe = {
  id: number;
  user_id: number;
  meal_id: string;
  meal_name: string;
  meal_thumb: string;
  saved_at: string;
};

export type RecipeRating = {
  average: number;
  count: number;
  userRating: number | null;
};

export type RecipeComment = {
  id: number;
  user_id: number;
  meal_id: string;
  comment: string;
  created_at: string;
  username: string;
};

export const recipeService = {
  getSavedRecipes: async () => {
    return api.get<SavedRecipe[]>(ENDPOINTS.SAVED_RECIPES);
  },

  saveRecipe: async (mealId: string, mealName: string, mealThumb: string) => {
    return api.post(ENDPOINTS.SAVED_RECIPES, { mealId, mealName, mealThumb });
  },

  removeSavedRecipe: async (mealId: string) => {
    return api.delete(`${ENDPOINTS.SAVED_RECIPES}/${mealId}`);
  },

  getRating: async (mealId: string) => {
    return api.get<RecipeRating>(`${ENDPOINTS.RATINGS}/${mealId}`);
  },

  rateRecipe: async (mealId: string, rating: number) => {
    return api.post(ENDPOINTS.RATINGS, { mealId, rating });
  },

  getComments: async (mealId: string) => {
    return api.get<RecipeComment[]>(`${ENDPOINTS.COMMENTS}/${mealId}`);
  },

  addComment: async (mealId: string, comment: string) => {
    return api.post(ENDPOINTS.COMMENTS, { mealId, comment });
  },
};
