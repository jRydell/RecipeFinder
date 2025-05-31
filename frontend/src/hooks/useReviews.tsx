import { useState, useEffect, useCallback } from "react";
import { recipeService, Review } from "@/api/services/recipe-service";
import { useAuthStore } from "@/stores/auth.store";

export const useReviews = (mealId: string | undefined) => {
  const { isAuthenticated } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchUserReview = useCallback(async () => {
    if (!mealId || !isAuthenticated) return;
    setError(null);
    const { data, error } = await recipeService.getUserReview(mealId);
    if (error) {
      setError(error);
    } else {
      setUserReview(data ?? null);
    }
  }, [mealId, isAuthenticated]);

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
    await fetchUserReview();
    return { data: data, error: null };
  };

  const deleteReview = async () => {
    if (!mealId)
      return {
        data: null,
        error: "Unable to delete review. Please try refreshing the page.",
      };
    setError(null);
    const { error } = await recipeService.deleteReview(mealId);
    if (error) {
      setError(error);
      return { data: null, error };
    }
    await fetchReviews();
    setUserReview(null);
    return { data: true, error: null };
  };

  useEffect(() => {
    void fetchReviews();
    void fetchUserReview();
  }, [fetchReviews, fetchUserReview]);

  return {
    reviews,
    userReview,
    loading,
    error,
    addReview,
    deleteReview,
    fetchReviews,
    fetchUserReview,
  };
};
