import { Meal } from "../api/services/mealdb-service";

/**
 * Extracts ingredients and their measurements from a meal object
 * @param recipe The meal object from the API
 * @returns Array of ingredient objects with ingredient and measure properties
 */
export const getIngredients = (recipe: Meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Meal];
    const measure = recipe[`strMeasure${i}` as keyof Meal];

    if (
      ingredient &&
      typeof ingredient === "string" &&
      ingredient.trim() !== ""
    ) {
      ingredients.push({
        ingredient,
        measure: measure || "",
      });
    }
  }
  return ingredients;
};
