import { Request, Response } from "express";
import * as reviewQueries from "../queries/review.queries";

export const upsertReview = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    const { meal_id, rating, comment } = req.body;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });
    if (!meal_id)
      return res.status(400).json({ message: "Meal ID is required" });
    const review = await reviewQueries.upsertReview(
      user_id,
      meal_id,
      rating ?? null,
      comment ?? null
    );
    res.status(200).json(review);
  } catch (error) {
    console.error("Error upserting review:", error);
    res.status(500).json({ message: "Failed to upsert review" });
  }
};

export const getReviewsByMealId = async (req: Request, res: Response) => {
  try {
    const { meal_id } = req.params;
    if (!meal_id)
      return res.status(400).json({ message: "Meal ID is required" });
    const reviews = await reviewQueries.getReviewsByMealId(meal_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const getReviewByUserAndMeal = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    const { meal_id } = req.params;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });
    if (!meal_id)
      return res.status(400).json({ message: "Meal ID is required" });
    const review = await reviewQueries.getReviewByUserAndMeal(user_id, meal_id);
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Failed to fetch review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    const { meal_id } = req.params;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });
    if (!meal_id)
      return res.status(400).json({ message: "Meal ID is required" });
    const success = await reviewQueries.deleteReview(user_id, meal_id);
    if (success) {
      res.status(200).json({ message: "Review deleted" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
