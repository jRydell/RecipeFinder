import { api, ENDPOINTS } from "../config/api-config";

export type SavedRecipe = {
  id: number;
  user_id: number;
  meal_id: string;
  meal_name: string;
  meal_thumb: string;
  saved_at: string;
};

export type Review = {
  id: number;
  meal_id: string;
  user_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
};

export const recipeService = {
  getSavedRecipes: async () => {
    return api.get<SavedRecipe[]>(ENDPOINTS.SAVED_RECIPES);
  },

  saveRecipe: async (mealId: string, mealName: string, mealThumb: string) => {
    return api.post<SavedRecipe>(ENDPOINTS.SAVED_RECIPES, {
      mealId,
      mealName,
      mealThumb,
    });
  },
  deleteSavedRecipe: async (mealId: string) => {
    return api.delete<SavedRecipe>(`${ENDPOINTS.SAVED_RECIPES}/${mealId}`);
  },

  getReviews: async (mealId: string) => {
    return api.get<Review[]>(`${ENDPOINTS.REVIEWS}/meal/${mealId}`);
  },

  getUserReview: async (mealId: string) => {
    return api.get<Review>(`${ENDPOINTS.REVIEWS}/user/meal/${mealId}`);
  },
  upsertReview: async (mealId: string, rating: number, comment: string) => {
    return api.post<Review>(`${ENDPOINTS.REVIEWS}`, {
      meal_id: mealId,
      rating,
      comment,
    });
  },

  deleteReview: async (mealId: string) => {
    return api.delete(`${ENDPOINTS.REVIEWS}/meal/${mealId}`);
  },
};
