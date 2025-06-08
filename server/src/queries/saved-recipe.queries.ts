// Saved recipe queries: handles database operations for saving, retrieving, and removing user recipes
// Uses MySQL connection for all queries

import connection from "../db";
import { SavedRecipe } from "../types/recipe.types";

/**
 * Saves a recipe for a user in the database.
 * Throws an error if the recipe is already saved (duplicate entry).
 * @param userId number
 * @param mealId string
 * @param mealName string
 * @param mealThumb string
 * @returns number (inserted saved recipe ID)
 */
export async function saveRecipe(
  userId: number,
  mealId: string,
  mealName: string,
  mealThumb: string
): Promise<number> {
  try {
    const [result] = await connection.query(
      "INSERT INTO saved_recipes (user_id, meal_id, meal_name, meal_thumb) VALUES (?, ?, ?, ?)",
      [userId, mealId, mealName, mealThumb]
    );
    return (result as any).insertId;
  } catch (error: any) {
    // Handle duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Recipe already saved");
    }
    throw error;
  }
}

/**
 * Retrieves all recipes saved by a user.
 * @param userId number
 * @returns Array of SavedRecipe objects
 */
export async function getUserSavedRecipes(
  userId: number
): Promise<SavedRecipe[]> {
  const [rows] = await connection.query(
    "SELECT * FROM saved_recipes WHERE user_id = ? ORDER BY saved_at DESC",
    [userId]
  );

  return rows as SavedRecipe[];
}

/**
 * Removes a saved recipe for a user.
 * @param userId number
 * @param mealId string
 * @returns true if deleted, false if not found
 */
export async function removeUserSavedRecipe(
  userId: number,
  mealId: string
): Promise<boolean> {
  const [result] = await connection.query(
    "DELETE FROM saved_recipes WHERE user_id = ? AND meal_id = ?",
    [userId, mealId]
  );

  return (result as any).affectedRows > 0;
}
