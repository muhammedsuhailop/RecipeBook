import { z } from "zod";

export const createFavoriteSchema = z.object({
  recipeId: z
    .number({
      required_error: "Recipe id is required",
      invalid_type_error: "Recipe id must be a number",
    })
    .int("Invalid Recipe id")
    .positive("Invalid Recipe id"),
});

export const removeFavoriteParamSchema = z.object({
  recipeId: z
    .string({
      required_error: "Recipe id is required",
      invalid_type_error: "Recipe id must be a string",
    })
    .regex(/^\d+$/, "Invalid Recipe id")
    .transform((value) => Number(value)),
});
