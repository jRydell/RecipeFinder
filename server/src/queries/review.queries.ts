// Review queries: handles database operations related to reviews (add, fetch, delete, ratings)
// Uses MySQL connection for all queries

import connection from "../db";
import { Review, ReviewResponse } from "../types/review.types";

/**
 * Adds a new review to the database for a meal by a user.
 * @param userId number
 * @param mealId string
 * @param rating number or null
 * @param comment string or null
 * @returns The created Review object
 */
export async function addReview(
  userId: number,
  mealId: string,
  rating: number | null,
  comment: string | null
): Promise<Review> {
  // Insert review into DB
  const [result] = await connection.query(
    `INSERT INTO reviews (user_id, meal_id, rating, comment)
     VALUES (?, ?, ?, ?)
     `,
    [userId, mealId, rating, comment]
  );

  // Fetch and return the newly created review
  const [rows] = await connection.query(
    `SELECT * FROM reviews WHERE user_id = ? AND meal_id = ?`,
    [userId, mealId]
  );
  return (rows as Review[])[0];
}

/**
 * Gets all reviews for a specific meal, including usernames.
 * @param mealId string
 * @returns Array of ReviewResponse objects
 */
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

/**
 * Gets all ratings (numbers) for a specific meal.
 * @param mealId string
 * @returns Array of numbers (ratings)
 */
export async function getAllRatingsByMealid(mealId: string): Promise<number[]> {
  const [result] = await connection.query(
    `SELECT rating
    FROM reviews 
    Where meal_id = ?`,
    [mealId]
  );

  return (result as Rating[]).map((r) => r.rating);
}

/**
 * Deletes a review for a meal by a specific user.
 * @param userId number
 * @param mealId string
 * @returns true if deleted, false if not found
 */
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
