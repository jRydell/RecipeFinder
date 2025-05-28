import * as reviewQueries from "../queries/review.queries";

export const reviewService = {
  async addReview(
    userId: number,
    mealId: string,
    rating?: number,
    comment?: string
  ) {
    try {
      if (!mealId) {
        return { error: "Meal ID is required", status: 400 };
      }

      const review = await reviewQueries.addReview(
        userId,
        mealId,
        rating ?? null,
        comment ?? null
      );

      return { data: review, status: 200 };
    } catch (error) {
      console.error("Error adding review:", error);
      return { error: "Failed to add review", status: 500 };
    }
  },

  async getReviewsByMealId(mealId: string) {
    try {
      if (!mealId) {
        return { error: "Meal ID is required", status: 400 };
      }

      const reviews = await reviewQueries.getReviewsByMealId(mealId);
      return { data: reviews, status: 200 };
    } catch (error) {
      console.error("Error getting reviews:", error);
      return { error: "Failed to get reviews", status: 500 };
    }
  },

  async getReviewByUserAndMeal(userId: number, mealId: string) {
    try {
      if (!mealId) {
        return { error: "Meal ID is required", status: 400 };
      }

      const review = await reviewQueries.getReviewByUserAndMeal(userId, mealId);
      return { data: review, status: 200 };
    } catch (error) {
      console.error("Error getting review:", error);
      return { error: "Failed to get review", status: 500 };
    }
  },
  async deleteReview(userId: number, mealId: string) {
    try {
      if (!mealId) {
        return { error: "Meal ID is required", status: 400 };
      }

      const result = await reviewQueries.deleteReview(userId, mealId);

      if (!result) {
        return { error: "Review not found", status: 404 };
      }

      return { data: { message: "Review deleted successfully" }, status: 200 };
    } catch (error) {
      console.error("Error deleting review:", error);
      return { error: "Failed to delete review", status: 500 };
    }
  },
  async getAverageRating(mealId: string) {
    try {
      if (!mealId) {
        return { error: "Meal ID is required", status: 400 };
      }

      const ratings = await reviewQueries.getAllRatingsByMealid(mealId);
      const totalRatings = ratings.reduce(
        (rating, current) => rating + current,
        0
      );
      const averageRating =
        ratings.length > 0 ? totalRatings / ratings.length : 0;

      return {
        data: {
          averageRating,
          count: ratings.length,
        },
        status: 200,
      };
    } catch (error) {
      console.error("Error getting average rating:", error);
      return { error: "Failed to get average rating", status: 500 };
    }
  },
};
