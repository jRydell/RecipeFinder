import * as savedRecipeQueries from "../queries/saved-recipe.queries";

export const savedRecipeService = {
  async saveRecipe(
    userId: number,
    mealId: string,
    mealName: string,
    mealThumb?: string
  ) {
    try {
      if (!mealId || !mealName) {
        return { error: "Recipe ID and name are required", status: 400 };
      }
      const savedId = await savedRecipeQueries.saveRecipe(
        userId,
        mealId,
        mealName,
        mealThumb || ""
      );

      return {
        data: {
          message: "Recipe saved successfully",
          savedId,
        },
        status: 201,
      };
    } catch (error: any) {
      if (error.message === "Recipe already saved") {
        return { error: "Recipe is already saved", status: 409 };
      }
      console.error("Error saving recipe:", error);
      return { error: "Failed to save recipe", status: 500 };
    }
  },
  async getSavedRecipes(userId: number) {
    try {
      const savedRecipes = await savedRecipeQueries.getUserSavedRecipes(userId);
      return { data: savedRecipes, status: 200 };
    } catch (error) {
      console.error("Error getting saved recipes:", error);
      return { error: "Failed to get saved recipes", status: 500 };
    }
  },

  async deleteSavedRecipe(userId: number, mealId: string) {
    try {
      if (!mealId) {
        return { error: "Meal ID is required", status: 400 };
      }

      const result = await savedRecipeQueries.removeUserSavedRecipe(
        userId,
        mealId
      );

      if (!result) {
        return { error: "Saved recipe not found", status: 404 };
      }

      return {
        data: { message: "Recipe removed from saved recipes" },
        status: 200,
      };
    } catch (error) {
      console.error("Error deleting saved recipe:", error);
      return { error: "Failed to delete saved recipe", status: 500 };
    }
  },
};
