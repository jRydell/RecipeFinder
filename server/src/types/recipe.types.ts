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

// The subset of a TheMealDB meal this API passes on to clients
export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

// A meal from TheMealDB together with the rating it earned in our database
export type TopRatedRecipe = Meal & {
  averageRating: number;
  count: number;
};
