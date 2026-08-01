import { useState, useEffect } from "react";
import { mealDbService } from "@/api/services/mealdb-service";
import { TopRatedRecipe, recipeService } from "@/api/services/recipe-service";
import { ratingCacheKey } from "@/hooks/useAverageRating";

// What a RecipeCard needs, so top rated recipes and the random fallback
// can be rendered through the same list.
export type CardMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

/**
 * The server ranks the recipes and looks their details up in TheMealDB, so
 * the whole section arrives in a single request. If nobody has rated anything
 * yet we fall back to random meals so the home page is never empty.
 */
export const useTopRatedRecipes = (count: number) => {
  const [meals, setMeals] = useState<CardMeal[]>([]);
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

      if (topRated && topRated.length > 0) {
        // The cards render AverageRating, and every rating is already in this
        // response, so seed the cache instead of letting each card refetch it.
        cacheRatings(topRated);
        setMeals(topRated);
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

const cacheRatings = (topRated: TopRatedRecipe[]) => {
  const timestamp = Date.now();

  for (const { idMeal, averageRating, count } of topRated) {
    sessionStorage.setItem(
      ratingCacheKey(idMeal),
      JSON.stringify({ data: { averageRating, count }, timestamp })
    );
  }
};
