export type SavedRecipe = {
  id: number;
  user_id: number;
  meal_id: string;
  meal_name: string;
  meal_thumb: string;
  saved_at: Date;
};

export type SavedRecipeDTO = {
  user_id: number;
  meal_id: string;
  meal_name: string;
  meal_thumb: string;
};
