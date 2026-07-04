export interface RecipeSearchParams {
  query: string;
  page: number;
  limit: number;
}

export interface IngredientSearchParams {
  ingredients: string[];
}

export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: string;
}

export interface RecipeAutocompleteResult {
  id: number;
  title: string;
}

export interface RecipeByIngredientsResult {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

export interface IRecipeApiService {
  searchRecipes(
    params: RecipeSearchParams,
  ): Promise<{ results: RecipeSummary[]; totalResults: number }>;

  getRecipeDetails(recipeId: number): Promise<RecipeDetails>;

  autocompleteRecipes(query: string): Promise<RecipeAutocompleteResult[]>;

  searchByIngredients(
    params: IngredientSearchParams,
  ): Promise<RecipeByIngredientsResult[]>;
}
