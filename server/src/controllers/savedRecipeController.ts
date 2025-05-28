import { Request, Response } from "express";
import { savedRecipeService } from "../services/savedRecipeService";

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
