import { z } from "zod";

export const reviewSchema = z.object({
  mealId: z
    .string()
    .min(1, "Unable to submit review. Please try again.")
    .max(20, "Unable to submit review. Please try again."),
  rating: z
    .number()
    .min(1, "Unable to submit review. Please try again.")
    .max(5, "Unable to submit review. Please try again."),
  comment: z
    .string()
    .max(500, "Review too long, max 500 characters ")
    .optional(),
});
