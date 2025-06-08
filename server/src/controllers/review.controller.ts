// Controller for review endpoints: handles review creation, retrieval, deletion, and average rating.
// Delegates business logic to reviewService and sends appropriate HTTP responses.

import { Request, Response } from "express";
import { reviewService } from "../services/review.service";

/**
 * POST /reviews
 * Adds a new review for a meal by the authenticated user.
 * Expects: { mealId, rating, comment } in request body.
 * Responds with the created review or error message.
 */
export const addReview = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { mealId, rating, comment } = req.body;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const result = await reviewService.addReview(userId, mealId, rating, comment);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

/**
 * GET /reviews/meal/:mealId
 * Retrieves all reviews for a specific meal.
 * Responds with an array of reviews or error message.
 */
export const getReviewsByMealId = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const result = await reviewService.getReviewsByMealId(mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(result.status).json(result.data);
};

/**
 * DELETE /reviews/meal/:mealId
 * Deletes the review for a meal by the authenticated user.
 * Responds with success message or error message.
 */
export const deleteReview = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { mealId } = req.params;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const result = await reviewService.deleteReview(userId, mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

/**
 * GET /reviews/average-rating?mealId=...
 * Retrieves the average rating for a specific meal.
 * Responds with the average rating or error message.
 */
export const getAverageRating = async (req: Request, res: Response) => {
  const mealId = req.query.mealId as string;
  const result = await reviewService.getAverageRating(mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};
