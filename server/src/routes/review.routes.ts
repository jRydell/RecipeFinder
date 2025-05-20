import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// create a review a review (auth)
router.post("/", authenticateToken, reviewController.addReview);

// Get all reviews for a meal (noAuth)
router.get("/meal/:meal_id", reviewController.getReviewsByMealId);

// Get a review by user and meal (auth)
router.get(
  "/user/meal/:meal_id",
  authenticateToken,
  reviewController.getReviewByUserAndMeal
);

// Delete a review (auth)
router.delete(
  "/meal/:meal_id",
  authenticateToken,
  reviewController.deleteReview
);

export default router;
