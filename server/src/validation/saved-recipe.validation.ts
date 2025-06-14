import { z } from "zod";

export const savedRecipeSchema = z.object({
  mealId: z
    .string()
    .min(1, "Unable to save recipe. Please try again.")
    .max(20, "Unable to save recipe. Please try again."),

  mealName: z
    .string()
    .min(1, "Unable to save recipe. Please try again.")
    .max(100, "Unable to save recipe. Please try again.")
    .trim(),

  mealThumb: z
    .string()
    .url("Unable to save recipe. Please try again.")
    .optional()
    .or(z.literal("")),
});
