import connection from "../db";
import { Comment, CommentResponse } from "../types/comment.types";

export async function addComment(
  userId: number,
  mealId: string,
  comment: string
): Promise<number> {
  const [result] = await connection.query(
    "INSERT INTO comments (user_id, meal_id, comment) VALUES (?, ?, ?)",
    [userId, mealId, comment]
  );

  return (result as any).insertId;
}

export async function getCommentsByMealId(
  mealId: string
): Promise<CommentResponse[]> {
  const [rows] = await connection.query(
    `SELECT c.*, u.username 
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.meal_id = ?
     ORDER BY c.created_at DESC`,
    [mealId]
  );

  return rows as CommentResponse[];
}
