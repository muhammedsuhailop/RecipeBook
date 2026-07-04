import { z } from "zod";

export const searchRecipesQuerySchema = z.object({
  query: z
    .string({
      required_error: "Search query is required",
      invalid_type_error: "Search query must be a string",
    })
    .min(1, "Search query is required"),

  page: z
    .string({
      invalid_type_error: "Page must be a string",
    })
    .optional()
    .transform((value) => (value ? Number(value) : 1))
    .pipe(
      z
        .number({
          invalid_type_error: "Page must be a number",
        })
        .int("Page must be an integer")
        .min(1, "Page must be at least 1"),
    ),

  limit: z
    .string({
      invalid_type_error: "Limit must be a string",
    })
    .optional()
    .transform((value) => (value ? Number(value) : 10))
    .pipe(
      z
        .number({
          invalid_type_error: "Limit must be a number",
        })
        .int("Limit must be an integer")
        .min(1, "Limit must be at least 1")
        .max(50, "Limit must be between 1 and 50"),
    ),
});

export const recipeIdParamSchema = z.object({
  id: z
    .string({
      required_error: "Recipe id is required",
      invalid_type_error: "Recipe id must be a string",
    })
    .regex(/^\d+$/, "Invalid Recipe id")
    .transform((value) => Number(value)),
});

export const autocompleteQuerySchema = z.object({
  query: z
    .string({
      required_error: "Search query is required",
      invalid_type_error: "Search query must be a string",
    })
    .min(1, "Search query is required"),
});

export const searchByIngredientsQuerySchema = z.object({
  ingredients: z
    .string({
      required_error: "Ingredients are required",
      invalid_type_error: "Ingredients must be a string",
    })
    .min(1, "At least one ingredient is required")
    .transform((value) =>
      value
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
    ),
});
