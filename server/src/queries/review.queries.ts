import connection from "../db";
import { Review, ReviewResponse, ReviewDTO } from "../types/review.types";

export async function addReview(
  user_id: number,
  meal_id: string,
  rating: number | null,
  comment: string | null
): Promise<Review> {
  const [result] = await connection.query(
    `INSERT INTO reviews (user_id, meal_id, rating, comment)
     VALUES (?, ?, ?, ?)
     `,
    [user_id, meal_id, rating, comment]
  );

  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [user_id, meal_id]
  );
  return (rows as Review[])[0];
}

export async function getReviewsByMealId(
  meal_id: string
): Promise<ReviewResponse[]> {
  const [rows] = await connection.query(
    `SELECT r.*, u.username 
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.meal_id = ?
     ORDER BY r.created_at DESC`,
    [meal_id]
  );
  return rows as ReviewResponse[];
}

export async function getReviewByUserAndMeal(
  user_id: number,
  meal_id: string
): Promise<Review | null> {
  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [user_id, meal_id]
  );
  const arr = rows as Review[];
  return arr.length > 0 ? arr[0] : null;
}

export async function deleteReview(
  user_id: number,
  meal_id: string
): Promise<boolean> {
  const [result] = await connection.query(
    `DELETE FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [user_id, meal_id]
  );
  // @ts-ignore
  return result.affectedRows > 0;
}
