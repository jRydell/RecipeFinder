// Service for review operations: handles business logic for adding, retrieving, deleting reviews, and calculating average ratings.
// Uses reviewQueries for database operations.

import * as reviewQueries from "../queries/review.queries";

export const reviewService = {
  /**
   * Adds a new review for a meal by a user.
   * Validates input and delegates to reviewQueries.
   * @param userId number
   * @param mealId string
   * @param rating number (optional)
   * @param comment string (optional)
   * @returns Created review or error message
   */
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

  /**
   * Retrieves all reviews for a specific meal.
   * @param mealId string
   * @returns Array of reviews or error message
   */
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

  /**
   * Deletes a review for a meal by a specific user.
   * @param userId number
   * @param mealId string
   * @returns Success message or error message
   */
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

  /**
   * Calculates the average rating for a specific meal.
   * @param mealId string
   * @returns Average rating and count or error message
   */
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
