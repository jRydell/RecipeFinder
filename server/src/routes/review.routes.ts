import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// create a review a review (auth)
router.post("/", authenticateToken, reviewController.addReview);

// Get all reviews for a meal (noAuth)
router.get("/meal/:mealId", reviewController.getReviewsByMealId);

// Get a review by user and meal (auth)
router.get(
  "/user/meal/:mealId",
  authenticateToken,
  reviewController.getReviewByUserAndMeal
);

// get average rating per meal id (no auth)
router.get("/average-rating", reviewController.getAverageRating);

// Delete a review (auth)
router.delete(
  "/meal/:mealId",
  authenticateToken,
  reviewController.deleteReview
);

export default router;
