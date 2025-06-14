import { Router } from "express";
import * as reviewController from "../controllers/review.controller";
import { authenticateToken } from "../middleware/auth";
import { validateBody } from "../middleware/validation";
import { reviewSchema } from "../validation/review.validation";

const router = Router();

// create a review a review (auth)
router.post(
  "/",
  authenticateToken,
  validateBody(reviewSchema),
  reviewController.addReview
);

// Get all reviews for a meal (noAuth)
router.get("/meal/:mealId", reviewController.getReviewsByMealId);

// get average rating per meal id (no auth)
router.get("/average-rating", reviewController.getAverageRating);

// Delete a review (auth)
router.delete(
  "/meal/:mealId",
  authenticateToken,
  reviewController.deleteReview
);

export default router;
