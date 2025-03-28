import { Request, Response } from "express";
import * as ratingQueries from "../queries/rating.queries";
import { RecipeRatingResponse } from "../types/rating.types";

export const rateRecipe = async (req: Request, res: Response) => {
  try {
    const { mealId, rating } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    if (!mealId) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    await ratingQueries.rateRecipe({
      user_id: userId,
      meal_id: mealId,
      rating,
    });

    const updatedRating = await ratingQueries.getRecipeRating(mealId);

    res.json({
      message: "Rating submitted successfully",
      rating: updatedRating,
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ error: "Failed to submit rating" });
  }
};

export const getRecipeRating = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    if (!mealId) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    const rating = await ratingQueries.getRecipeRating(mealId);
    let userRating = null;

    if (req.user?.id) {
      userRating = await ratingQueries.getUserRating(req.user.id, mealId);
    }

    const response: RecipeRatingResponse = {
      average: rating.average,
      count: rating.count,
      userRating,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ error: "Failed to fetch rating" });
  }
};
