// Controller for saved recipe endpoints: handles saving, retrieving, and deleting recipes for authenticated users.
// Delegates business logic to savedRecipeService and sends appropriate HTTP responses.

import { Request, Response } from "express";
import { savedRecipeService } from "../services/saved-recipe.service";

/**
 * POST /my-recipes
 * Saves a recipe to the authenticated user's collection.
 * Expects: { mealId, mealName, mealThumb } in request body.
 * Responds with the saved recipe or error message.
 */
export const saveRecipe = async (req: Request, res: Response) => {
  const { mealId, mealName, mealThumb } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await savedRecipeService.saveRecipe(
    userId,
    mealId,
    mealName,
    mealThumb
  );

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

/**
 * GET /my-recipes
 * Retrieves all recipes saved by the authenticated user.
 * Responds with an array of saved recipes or error message.
 */
export const getSavedRecipes = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await savedRecipeService.getSavedRecipes(userId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

/**
 * DELETE /my-recipes/:mealId
 * Deletes a saved recipe for the authenticated user.
 * Responds with success message or error message.
 */
export const deleteSavedRecipe = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await savedRecipeService.deleteSavedRecipe(userId, mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};
