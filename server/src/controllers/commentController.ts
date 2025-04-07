import { Request, Response } from "express";
import * as commentQueries from "../queries/comment.queries";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { mealId, comment } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    if (!mealId) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const commentId = await commentQueries.addComment(userId, mealId, comment);

    res.status(201).json({
      message: "Comment added successfully",
      commentId,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    if (!mealId) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    const comments = await commentQueries.getCommentsByMealId(mealId);

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
