import { z } from "zod";

export const reviewBodySchema = z.object({
  mealId: z
    .string()
    .min(1, "Unable to submit review, please try again.")
    .max(20, "Unable to submit review, Please try again."),
  rating: z
    .number()
    .min(1, "Unable to submit review, please try again.")
    .max(5, "Unable to submit review, please try again."),
  comment: z
    .string()
    .max(500, "Review too long, max 500 characters ")
    .optional(),
});

export const reviewParamsSchema = z.object({
  mealId: z
    .string()
    .min(1, "Could not load reviews, please try again")
    .max(20, "Could not load reviews, please try again"),
});

export const averageRatingQuerySchema = z.object({
  mealId: z
    .string()
    .min(1, "Could not fetch rating please try again")
    .max(20, "Could not fetch rating please try again"),
});

const TOP_RATED_ERROR = "Could not fetch top rated recipes, please try again";

export const topRatedQuerySchema = z.object({
  limit: z.coerce
    .number({ invalid_type_error: TOP_RATED_ERROR })
    .int(TOP_RATED_ERROR)
    .min(1, TOP_RATED_ERROR)
    .max(24, TOP_RATED_ERROR)
    .optional(),
  minReviews: z.coerce
    .number({ invalid_type_error: TOP_RATED_ERROR })
    .int(TOP_RATED_ERROR)
    .min(1, TOP_RATED_ERROR)
    .optional(),
});

export const deleteReviewSchema = z.object({
  mealId: z
    .string()
    .min(1, "Could not delete review, please try again")
    .max(20, "Could not delete review, please try again"),
});
