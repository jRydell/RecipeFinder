import { useState, useEffect, useCallback, useMemo } from "react";
import { recipeService, Review } from "@/api/services/recipe-service";
import { useAuthStore } from "@/stores/auth.store";

export const useReviews = (mealId: string | undefined) => {
  const { isAuthenticated, user } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const addReview = async (
    rating: number,
    comment?: string
  ): Promise<boolean> => {
    if (!mealId) {
      setError("Unable to add review. Please try refreshing the page.");
      return false;
    }
    setError(null);
    setSubmitting(true);

    const { error } = await recipeService.addReview(
      mealId,
      rating,
      comment ?? ""
    );
    setSubmitting(false);
    if (error) {
      setError(error);
      return false;
    }
    await fetchReviews();
    return true;
  };

  const deleteReview = async (): Promise<boolean> => {
    if (!mealId) {
      setError("Unable to delete review. Please try refreshing the page.");
      return false;
    }
    setError(null);
    setSubmitting(true);
    const { error } = await recipeService.deleteReview(mealId);
    setSubmitting(false);
    if (error) {
      setError(error);
      return false;
    }
    await fetchReviews();
    return true;
  };

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);
  return {
    reviews,
    userReview,
    loading,
    error,
    submitting,
    addReview,
    deleteReview,
    fetchReviews,
  };
};
