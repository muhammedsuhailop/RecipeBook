export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string;
}

export interface RecipeSuggestion {
  id: number;
  title: string;
}

export interface SearchRecipesParams {
  query: string;
  page: number;
  limit: number;
}

export interface SearchRecipesData {
  recipes: RecipeSummary[];
  totalResults: number;
  page: number;
  limit: number;
}

export interface RecipesState {
  search: {
    query: string;
    page: number;
    limit: number;
    results: RecipeSummary[];
    totalResults: number;
    loading: boolean;
    error: string | null;
    hasSearched: boolean;
  };
  details: {
    byId: Record<number, RecipeDetails>;
    loadingId: number | null;
    error: string | null;
  };
  suggestions: {
    items: RecipeSuggestion[];
    loading: boolean;
    error: string | null;
  };
}
