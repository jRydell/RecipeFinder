import { useState, useEffect, useCallback } from "react";
import { recipeService, Review } from "@/api/services/recipe-service";
import { useAuthStore } from "@/stores/auth.store";

export const useReviews = (mealId: string | undefined) => {
  const { isAuthenticated } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!mealId) return;
    setLoading(true);
    setError(null);
    const { data, error } = await recipeService.getReviews(mealId);
    if (error) setError(error);
    if (data) setReviews(data);
    setLoading(false);
  }, [mealId]);

  const fetchUserReview = useCallback(async () => {
    if (!mealId || !isAuthenticated) return;
    setError(null);
    const { data, error } = await recipeService.getUserReview(mealId);
    if (error) setError(error);
    setUserReview(data ?? null);
  }, [mealId, isAuthenticated]);

  const addReview = async (rating: number, comment?: string) => {
    if (!mealId) return { success: false, error: "No recipe selected" };
    setError(null);
    const { data, error } = await recipeService.addReview(
      mealId,
      rating,
      comment ?? ""
    );
    if (error) {
      setError(error);
      return { success: false, error };
    }
    await fetchReviews();
    await fetchUserReview();
    return { success: true, review: data };
  };

  const deleteReview = async () => {
    if (!mealId) return { success: false, error: "No recipe selected" };
    setError(null);
    const { error } = await recipeService.deleteReview(mealId);
    if (error) {
      setError(error);
      return { success: false, error };
    }
    await fetchReviews();
    setUserReview(null);
    return { success: true };
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
