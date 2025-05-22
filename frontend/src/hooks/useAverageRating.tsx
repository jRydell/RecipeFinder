import { useState, useEffect } from "react";
import { Rating, recipeService } from "@/api/services/recipe-service";

type CachedRating = {
  data: Rating;
  timestamp: number;
};

const CACHE_DURATION = 30 * 60 * 1000;

export const useAverageRating = (mealId: string | undefined) => {
  const [rating, setRating] = useState<Rating | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      if (!mealId) return;

      try {
        const cacheKey = `rating_${mealId}`;
        const cachedDataString = sessionStorage.getItem(cacheKey);

        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString) as CachedRating;
          const now = Date.now();

          if (now - cachedData.timestamp < CACHE_DURATION) {
            setRating(cachedData.data);
            return;
          }
        }

        setLoading(true);
        setError(null);

        const { data, error } = await recipeService.getAverageRating(mealId);
        if (error) {
          setError(error);
          setRating(null);
        } else if (data) {
          const cacheData = {
            data,
            timestamp: Date.now(),
          };
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
          setRating(data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rating:", err);
        setError("An error occurred while fetching the rating");
        setLoading(false);
      }
    };

    void fetchAverageRating();
  }, [mealId]);

  return { rating, loading, error };
};
