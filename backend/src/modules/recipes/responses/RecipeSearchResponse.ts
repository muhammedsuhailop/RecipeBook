import { RecipeSummaryResponse } from "./RecipeSummaryResponse";

export interface RecipeSearchResponse {
  recipes: RecipeSummaryResponse[];
  totalResults: number;
  page: number;
  limit: number;
}
