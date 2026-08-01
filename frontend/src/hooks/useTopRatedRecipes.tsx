import { useState, useEffect } from "react";
import { Meal, mealDbService } from "@/api/services/mealdb-service";
import { TopRatedMeal, recipeService } from "@/api/services/recipe-service";
import { ratingCacheKey } from "@/hooks/useAverageRating";

/**
 * Our own database only stores meal_id for a review, so the top rated list
 * comes back as ids that still need their name and image from TheMealDB.
 * If nobody has rated anything yet we fall back to random meals so the
 * section on the home page is never empty.
 */
export const useTopRatedRecipes = (count: number) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRated = async () => {
      setLoading(true);
      setError(null);

      const { data: topRated, error: topRatedError } =
        await recipeService.getTopRated(count);

      if (topRatedError) {
        setError(topRatedError);
      }

      const details = await lookupMeals(topRated ?? []);

      if (details.length > 0) {
        // The cards render AverageRating, and we already know every rating
        // here, so seed the cache instead of letting each card refetch it.
        cacheRatings(topRated ?? []);
        setMeals(details);
        setIsFallback(false);
      } else {
        const { data: randomMeals } = await mealDbService.getRandomMeals(count);
        setMeals(randomMeals ?? []);
        setIsFallback(true);
      }

      setLoading(false);
    };

    void fetchTopRated();
  }, [count]);

  return { meals, isFallback, loading, error };
};

/**
 * Looks up every meal in parallel and keeps the ranking order from the API.
 * Meals that no longer exist in TheMealDB are dropped.
 */
const lookupMeals = async (topRated: TopRatedMeal[]): Promise<Meal[]> => {
  const responses = await Promise.all(
    topRated.map((meal) => mealDbService.getById(meal.mealId))
  );

  return responses
    .map((response) => response.data)
    .filter((meal): meal is Meal => meal !== null);
};

const cacheRatings = (topRated: TopRatedMeal[]) => {
  const timestamp = Date.now();

  for (const { mealId, averageRating, count } of topRated) {
    sessionStorage.setItem(
      ratingCacheKey(mealId),
      JSON.stringify({ data: { averageRating, count }, timestamp })
    );
  }
};
