// Service for review operations: handles business logic for adding, retrieving, deleting reviews, and calculating average ratings.
// Uses reviewQueries for database operations.

import * as reviewQueries from "../queries/review.queries";
import { mealDbService } from "./mealdb.service";
import { TopRatedRecipe } from "../types/recipe.types";

// Upper bound on how many top rated meals a single request can ask for
const MAX_LIMIT = 24;

// The top rated list only changes when a review is written, but serving it
// costs one TheMealDB lookup per recipe. Holding the finished response in
// memory keeps the home page from triggering those lookups on every visit.
const TOP_RATED_TTL = 5 * 60 * 1000;

type CachedTopRated = {
  data: TopRatedRecipe[];
  expiresAt: number;
};

// Keyed by limit and minReviews, since those produce different lists
const topRatedCache = new Map<string, CachedTopRated>();

const clearTopRatedCache = () => topRatedCache.clear();

export const reviewService = {
  /**
   * Adds a new review for a meal by a user.
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
      const review = await reviewQueries.addReview(
        userId,
        mealId,
        rating ?? null,
        comment ?? null
      );

      // A new rating can reorder the top list, so stop serving the old one
      clearTopRatedCache();

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

      // Removing a rating can reorder the top list too
      clearTopRatedCache();

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

  /**
   * Gets the highest rated meals across all users, with the recipe details
   * looked up from TheMealDB so clients get everything in one response.
   * Meals that cannot be fetched from TheMealDB are left out rather than
   * failing the whole request.
   * @param limit how many meals to return (clamped to 1-24)
   * @param minReviews minimum number of ratings a meal needs to qualify
   * @returns Array of top rated recipes or error message
   */
  async getTopRatedMeals(limit: number, minReviews: number) {
    try {
      const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT);
      const safeMinReviews = Math.max(Math.trunc(minReviews), 1);

      const cacheKey = `${safeLimit}:${safeMinReviews}`;
      const cached = topRatedCache.get(cacheKey);

      if (cached && cached.expiresAt > Date.now()) {
        return { data: cached.data, status: 200 };
      }

      const rated = await reviewQueries.getTopRatedMeals(
        safeLimit,
        safeMinReviews
      );

      // Look the recipes up in parallel, keeping each meal paired with the
      // rating it earned and preserving the ranking order.
      const recipes = await Promise.all(
        rated.map(async ({ mealId, averageRating, count }) => {
          const meal = await mealDbService.getById(mealId);
          return meal ? { ...meal, averageRating, count } : null;
        })
      );

      const data = recipes.filter(
        (recipe): recipe is TopRatedRecipe => recipe !== null
      );

      // Only cache a complete list. If TheMealDB dropped a recipe we still
      // serve what we got, but the next request retries instead of being
      // stuck with the gap until the entry expires.
      if (data.length === rated.length) {
        topRatedCache.set(cacheKey, {
          data,
          expiresAt: Date.now() + TOP_RATED_TTL,
        });
      }

      return { data, status: 200 };
    } catch (error) {
      console.error("Error getting top rated meals:", error);
      return { error: "Failed to get top rated recipes", status: 500 };
    }
  },
};
