import { Request, Response } from "express";
import * as reviewQueries from "../queries/review.queries";

export const addReview = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    const { meal_id, rating, comment } = req.body;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });
    if (!meal_id)
      return res.status(400).json({ message: "Meal ID is required" });
    const review = await reviewQueries.addReview(
      user_id,
      meal_id,
      rating ?? null,
      comment ?? null
    );
    res.status(200).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to ass review" });
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

export const getAverageRating = async (req: Request, res: Response) => {
  try {
    const meal_id = req.query.meal_id as string;

    if (!meal_id) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    const ratings: number[] = await reviewQueries.getAllRatingsByMealid(
      meal_id
    );

    const totalRatings = ratings.reduce(
      (rating, current) => rating + current,
      0
    );
    const averageRating =
      ratings.length > 0 ? totalRatings / ratings.length : 0;
    res.status(200).json({ averageRating, count: ratings.length });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).json({ message: "Failed to fetch average rating" });
  }
};
