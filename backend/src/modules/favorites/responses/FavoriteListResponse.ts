import { RecipeSummaryResponse } from "../../recipes/responses/RecipeSummaryResponse";

export interface FavoriteListResponse {
  favorites: RecipeSummaryResponse[];
  total: number;
}
