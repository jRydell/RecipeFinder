import { Router } from "express";
import * as ratingController from "../controllers/ratingController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Get rating is public (but will include user's rating if authenticated)
router.get("/:mealId", ratingController.getRecipeRating);

// Submit rating requires authentication
router.post("/", authenticateToken, ratingController.rateRecipe);

export default router;
