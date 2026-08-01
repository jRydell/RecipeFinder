// Service for looking up recipes in TheMealDB, the public API this app builds on.
// Our own tables only store meal_id, so names and images have to come from here.

import { Meal } from "../types/recipe.types";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// Keep a slow third party from holding our own response open
const REQUEST_TIMEOUT = 5000;

type MealDbResponse = {
  meals: Meal[] | null;
};

export const mealDbService = {
  /**
   * Looks up a single meal by its TheMealDB id.
   * @param mealId string
   * @returns The meal, or null if it does not exist or the lookup failed
   */
  async getById(mealId: string): Promise<Meal | null> {
    try {
      const response = await fetch(
        `${API_BASE}/lookup.php?i=${encodeURIComponent(mealId)}`,
        { signal: AbortSignal.timeout(REQUEST_TIMEOUT) }
      );

      if (!response.ok) {
        console.error(
          `TheMealDB responded ${response.status} for meal ${mealId}`
        );
        return null;
      }

      const body = (await response.json()) as MealDbResponse;
      return body.meals?.[0] ?? null;
    } catch (error) {
      console.error(`Error fetching meal ${mealId} from TheMealDB:`, error);
      return null;
    }
  },
};
