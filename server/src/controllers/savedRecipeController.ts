import { Request, Response } from "express";
import * as savedRecipeQueries from "../queries/savedRecipe.queries";

export const saveRecipe = async (req: Request, res: Response) => {
  try {
    const { mealId, mealName, mealThumb } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    if (!mealId || !mealName) {
      return res.status(400).json({ error: "Recipe ID and name are required" });
    }

    const savedId = await savedRecipeQueries.saveRecipe(
      userId,
      mealId,
      mealName,
      mealThumb
    );

    res.status(201).json({
      message: "Recipe saved successfully",
      savedId,
    });
  } catch (error: any) {
    if (error.message === "Recipe already saved") {
      return res.status(409).json({ error: "Recipe is already saved" });
    }
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
};

export const getSavedRecipes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const savedRecipes = await savedRecipeQueries.getUserSavedRecipes(userId);

    res.json(savedRecipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
};

export const removeSavedRecipe = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    const removed = await savedRecipeQueries.removeUserSavedRecipe(
      userId,
      mealId
    );

    if (!removed) {
      return res.status(404).json({ error: "Recipe not found in saved list" });
    }

    res.json({ message: "Recipe removed from saved list" });
  } catch (error) {
    console.error("Error removing saved recipe:", error);
    res.status(500).json({ error: "Failed to remove saved recipe" });
  }
};
