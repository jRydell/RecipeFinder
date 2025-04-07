import connection from "../db";
import { Rating, RatingDTO } from "../types/rating.types";

export async function rateRecipe(ratingData: RatingDTO): Promise<void> {
  try {
    await connection.query(
      "INSERT INTO ratings (user_id, meal_id, rating) VALUES (?, ?, ?) " +
        "ON DUPLICATE KEY UPDATE rating = ?",
      [
        ratingData.user_id,
        ratingData.meal_id,
        ratingData.rating,
        ratingData.rating,
      ]
    );
  } catch (error) {
    throw error;
  }
}

export async function getRecipeRating(
  mealId: string
): Promise<{ average: number; count: number }> {
  const [rows] = await connection.query(
    "SELECT AVG(rating) as average, COUNT(*) as count FROM ratings WHERE meal_id = ?",
    [mealId]
  );

  const result = (rows as any[])[0];
  return {
    average: result.average ? parseFloat(result.average) : 0,
    count: parseInt(result.count),
  };
}

export async function getUserRating(
  userId: number,
  mealId: string
): Promise<number | null> {
  const [rows] = await connection.query(
    "SELECT rating FROM ratings WHERE user_id = ? AND meal_id = ?",
    [userId, mealId]
  );

  const ratings = rows as any[];
  return ratings.length > 0 ? ratings[0].rating : null;
}
