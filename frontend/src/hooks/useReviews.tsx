import { useState, useEffect, useCallback, useMemo } from "react";
import { recipeService, Review } from "@/api/services/recipe-service";
import { useAuthStore } from "@/stores/auth.store";

export const useReviews = (mealId: string | undefined) => {
  const { isAuthenticated, user } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userReview = useMemo(() => {
    if (!user?.username || !isAuthenticated) return null;
    return reviews.find((review) => review.username === user.username) || null;
  }, [reviews, user?.username, isAuthenticated]);

  const fetchReviews = useCallback(async () => {
    if (!mealId) return;
    setLoading(true);
    setError(null);
    const { data, error } = await recipeService.getReviews(mealId);
    if (error) {
      setError(error);
    } else if (data) {
      setReviews(data);
    }
    setLoading(false);
  }, [mealId]);

  const addReview = async (rating: number, comment?: string) => {
    if (!mealId)
      return {
        data: null,
        error: "Unable to add review. Please try refreshing the page.",
      };
    setError(null);
    const { data, error } = await recipeService.addReview(
      mealId,
      rating,
      comment ?? ""
    );
    if (error) {
      setError(error);
      return { data: null, error };
    }
    await fetchReviews();
    return { data: data, error: null };
  };
  const deleteReview = async () => {
    if (!mealId)
      return {
        data: null,
        error: "Unable to delete review. Please try refreshing the page.",
      };
    setError(null);
    const { data, error } = await recipeService.deleteReview(mealId);
    if (error) {
      setError(error);
      return { data: null, error };
    }
    await fetchReviews();
    return { data, error: null };
  };

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);
  return {
    reviews,
    userReview,
    loading,
    error,
    addReview,
    deleteReview,
    fetchReviews,
  };
};
