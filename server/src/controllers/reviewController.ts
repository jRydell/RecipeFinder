import { Request, Response } from "express";
import { reviewService } from "../services/reviewService";

export const addReview = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const { meal_id, rating, comment } = req.body;

  if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  const result = await reviewService.addReview(
    user_id,
    meal_id,
    rating,
    comment
  );

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

export const getReviewsByMealId = async (req: Request, res: Response) => {
  const { meal_id } = req.params;
  const result = await reviewService.getReviewsByMealId(meal_id);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

export const getReviewByUserAndMeal = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const { meal_id } = req.params;

  if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  const result = await reviewService.getReviewByUserAndMeal(user_id, meal_id);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

export const deleteReview = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const { meal_id } = req.params;

  if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  const result = await reviewService.deleteReview(user_id, meal_id);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

export const getAverageRating = async (req: Request, res: Response) => {
  const meal_id = req.query.meal_id as string;
  const result = await reviewService.getAverageRating(meal_id);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};
