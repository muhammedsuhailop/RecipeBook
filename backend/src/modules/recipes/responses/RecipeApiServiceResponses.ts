export interface RecipeSearchApiResponse {
  results: Array<{
    id: number;
    title: string;
    image: string;
    imageType: string;
  }>;
  totalResults: number;
}

export interface RecipeDetailsApiResponse {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: string;
}

export interface RecipeAutocompleteApiResponse {
  id: number;
  title: string;
}

export interface RecipeByIngredientsApiResponse {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}
