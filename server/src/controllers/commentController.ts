import { Request, Response } from "express";
import * as commentQueries from "../queries/comment.queries";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { mealId, comment } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mealId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const commentId = await commentQueries.addComment(userId, mealId, comment);

    res.status(201).json({
      message: "Comment added successfully",
      commentId,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    if (!mealId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    const comments = await commentQueries.getCommentsByMealId(mealId);

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    const success = await commentQueries.deleteComment(
      parseInt(commentId, 10),
      userId
    );

    if (!success) {
      return res.status(404).json({
        message: "Comment not found or you don't have permission to delete it",
      });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
