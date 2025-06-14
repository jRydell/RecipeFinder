import { Router } from "express";
import * as savedRecipeController from "../controllers/saved-recipe.controller";
import { authenticateToken } from "../middleware/auth";
import { validateBody } from "../middleware/validation";
import { savedRecipeSchema } from "../validation/saved-recipe.validation";

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Save a recipe to user's collection
router.post(
  "/",
  validateBody(savedRecipeSchema),
  savedRecipeController.saveRecipe
);

// Get all saved recipes for the logged-in user
router.get("/", savedRecipeController.getSavedRecipes);

// Re a recipe from user's collection
router.delete("/:mealId", savedRecipeController.deleteSavedRecipe);

export default router;
