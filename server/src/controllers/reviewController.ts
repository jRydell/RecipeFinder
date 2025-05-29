import { Request, Response } from "express";
import { reviewService } from "../services/reviewService";

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

export const getReviewsByMealId = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const result = await reviewService.getReviewsByMealId(mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

export const getReviewByUserAndMeal = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { mealId } = req.params;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const result = await reviewService.getReviewByUserAndMeal(userId, mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  console.log("getReviewByUserAndMeal response:", result.data); // Log response
  res.status(result.status).json(result.data);
};

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

export const getAverageRating = async (req: Request, res: Response) => {
  const mealId = req.query.mealId as string;
  const result = await reviewService.getAverageRating(mealId);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};
