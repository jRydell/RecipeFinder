export type SavedRecipe = {
  id: number;
  user_id: number;
  meal_id: string;
  meal_name: string;
  meal_thumb: string;
  saved_at: Date;
};

export type SavedRecipeDTO = {
  userId: number;
  mealId: string;
  mealName: string;
  mealThumb: string;
};
