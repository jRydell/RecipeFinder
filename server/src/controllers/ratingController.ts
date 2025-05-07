import { Request, Response } from "express";
import * as ratingQueries from "../queries/rating.queries";

export const rateRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mealId, rating } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mealId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5" });
    }

    await ratingQueries.rateRecipe({
      user_id: userId,
      meal_id: mealId,
      rating,
    });

    res.status(201).json({
      message: "Rating added successfully",
    });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ message: "Failed to add rating" });
  }
};

export const getRecipeRating = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    if (!mealId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    const ratings = await ratingQueries.getRecipeRating(mealId);

    res.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Failed to fetch ratings" });
  }
};

export const getUserRating = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mealId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mealId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    const rating = await ratingQueries.getUserRating(userId, mealId);

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.json(rating);
  } catch (error) {
    console.error("Error fetching user rating:", error);
    res.status(500).json({ message: "Failed to fetch user rating" });
  }
};
