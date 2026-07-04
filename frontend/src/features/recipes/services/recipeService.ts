import type { AxiosRequestConfig } from "axios";
import { apiClient } from "@/shared/api/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiEndpoints";
import type { ApiResponse } from "@/shared/api/apiTypes";
import type {
  RecipeDetails,
  RecipeSuggestion,
  SearchRecipesData,
  SearchRecipesParams,
} from "@/features/recipes/types/recipe.types";

export const recipeService = {
  async search(
    params: SearchRecipesParams,
    config?: AxiosRequestConfig,
  ): Promise<SearchRecipesData> {
    const { data } = await apiClient.get<ApiResponse<SearchRecipesData>>(
      API_ENDPOINTS.recipes.search,
      { params, ...config },
    );
    return data.data;
  },

  async autocomplete(
    query: string,
    config?: AxiosRequestConfig,
  ): Promise<RecipeSuggestion[]> {
    const { data } = await apiClient.get<ApiResponse<RecipeSuggestion[]>>(
      API_ENDPOINTS.recipes.autocomplete,
      { params: { query }, ...config },
    );
    return data.data;
  },

  async getDetails(
    recipeId: number,
    config?: AxiosRequestConfig,
  ): Promise<RecipeDetails> {
    const { data } = await apiClient.get<ApiResponse<RecipeDetails>>(
      API_ENDPOINTS.recipes.details(recipeId),
      config,
    );
    return data.data;
  },
};
