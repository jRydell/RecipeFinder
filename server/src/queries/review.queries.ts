import connection from "../db";
import { Review } from "../types/review.types";

export async function upsertReview(
  user_id: number,
  meal_id: string,
  rating: number | null,
  comment: string | null
): Promise<Review> {
  // Insert or update review
  const [result] = await connection.query(
    `INSERT INTO reviews (user_id, meal_id, rating, comment)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment), updated_at = CURRENT_TIMESTAMP`,
    [user_id, meal_id, rating, comment]
  );
  // Return the review
  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [user_id, meal_id]
  );
  return (rows as Review[])[0];
}

export async function getReviewsByMealId(meal_id: string): Promise<Review[]> {
  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE meal_id = ? ORDER BY created_at DESC`,
    [meal_id]
  );
  return rows as Review[];
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
