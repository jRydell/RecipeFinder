import { z } from "zod";

export const savedRecipeSchema = z.object({
  mealId: z
    .string()
    .min(1, "Could not save recipe, please try again.")
    .max(20, "Could not save recipe, please try again."),

  mealName: z
    .string()
    .min(1, "Could not save recipe, please try again.")
    .max(100, "Could not save recipe, please try again.")
    .trim(),

  mealThumb: z
    .string()
    .url("Could not save recipe, please try again.")
    .optional()
    .or(z.literal("")),
});

export const deleteRecipeSchema = z.object({
  mealId: z
    .string()
    .min(1, "Could not delete recipe, please try again")
    .max(20, "Could not delete recipe, please try again"),
});
