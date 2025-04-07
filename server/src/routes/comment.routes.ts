import { Router } from "express";
import * as commentController from "../controllers/commentController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Get comments for a recipe (public)
router.get("/:mealId", commentController.getComments);

// Add a comment to a recipe (requires authentication)
router.post("/", authenticateToken, commentController.addComment);

export default router;
