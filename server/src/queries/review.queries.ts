import connection from "../db";
import { Review, ReviewResponse } from "../types/review.types";

export async function addReview(
  userId: number,
  mealId: string,
  rating: number | null,
  comment: string | null
): Promise<Review> {
  const [result] = await connection.query(
    `INSERT INTO reviews (user_id, meal_id, rating, comment)
     VALUES (?, ?, ?, ?)
     `,
    [userId, mealId, rating, comment]
  );

  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [userId, mealId]
  );
  return (rows as Review[])[0];
}

export async function getReviewsByMealId(
  mealId: string
): Promise<ReviewResponse[]> {
  const [rows] = await connection.query(
    `SELECT r.*, u.username 
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.meal_id = ?
     ORDER BY r.created_at DESC`,
    [mealId]
  );
  return rows as ReviewResponse[];
}

type Rating = {
  rating: number;
};

export async function getAllRatingsByMealid(mealId: string): Promise<number[]> {
  const [result] = await connection.query(
    `SELECT rating
    FROM reviews 
    Where meal_id = ?`,
    [mealId]
  );

  return (result as Rating[]).map((r) => r.rating);
}

export async function getReviewByUserAndMeal(
  userId: number,
  mealId: string
): Promise<Review | null> {
  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [userId, mealId]
  );
  const arr = rows as Review[];
  return arr.length > 0 ? arr[0] : null;
}

export async function deleteReview(
  userId: number,
  mealId: string
): Promise<boolean> {
  const [result] = await connection.query(
    `DELETE FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [userId, mealId]
  );
  // @ts-ignore
  return result.affectedRows > 0;
}
