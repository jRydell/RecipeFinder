import connection from "../db";
import { SavedRecipe } from "../types/recipe.types";

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

export async function getUserSavedRecipes(
  userId: number
): Promise<SavedRecipe[]> {
  const [rows] = await connection.query(
    "SELECT * FROM saved_recipes WHERE user_id = ? ORDER BY saved_at DESC",
    [userId]
  );

  return rows as SavedRecipe[];
}

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
