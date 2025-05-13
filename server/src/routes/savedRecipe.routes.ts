import { Router } from "express";
import * as savedRecipeController from "../controllers/savedRecipeController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Save a recipe to user's collection
router.post("/", savedRecipeController.saveRecipe);

// Get all saved recipes for the logged-in user
router.get("/", savedRecipeController.getSavedRecipes);

// Re a recipe from user's collection
router.delete("/:mealId", savedRecipeController.deleteSavedRecipe);

export default router;
