import { Router } from "express";
import * as reviewController from "../controllers/review.controller";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validation";
import {
  averageRatingQuerySchema,
  deleteReviewSchema,
  reviewBodySchema,
  reviewParamsSchema,
} from "../validation/review.validation";

const router = Router();

// create a review a review (auth)
router.post(
  "/",
  authenticateToken,
  validate(reviewBodySchema, "body"),
  reviewController.addReview
);

// Get all reviews for a meal (noAuth)
router.get(
  "/meal/:mealId",
  validate(reviewParamsSchema, "params"),
  reviewController.getReviewsByMealId
);

// get average rating per meal id (no auth)
router.get(
  "/average-rating",
  validate(averageRatingQuerySchema, "query"),
  reviewController.getAverageRating
);

// Delete a review (auth)
router.delete(
  "/meal/:mealId",
  authenticateToken,
  validate(deleteReviewSchema, "params"),
  reviewController.deleteReview
);

export default router;
