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

export const deleteReviewSchema = z.object({
  mealId: z
    .string()
    .min(1, "Could not delete review, please try again")
    .max(20, "Could not delete review, please try again"),
});
