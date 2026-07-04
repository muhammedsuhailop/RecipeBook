export const RecipeApiEndpoints = {
  SEARCH: "/recipes/complexSearch",
  DETAILS: (recipeId: number) => `/recipes/${recipeId}/information`,
  AUTOCOMPLETE: "/recipes/autocomplete",
  BY_INGREDIENTS: "/recipes/findByIngredients",
} as const;

export const RecipeApiDefaults = {
  AUTOCOMPLETE_LIMIT: 10,
  INGREDIENT_SEARCH_LIMIT: 10,
  REQUEST_TIMEOUT: 8000,
} as const;
