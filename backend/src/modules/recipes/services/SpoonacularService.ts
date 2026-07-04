import axios, { AxiosInstance, AxiosError } from "axios";
import { env } from "../../../config/env";
import { logger } from "../../../config/logger";
import { ApiError } from "../../../utils/ApiError";
import { HttpStatus } from "../../../constants/httpStatus.constants";
import { RecipeMessages } from "../../../constants/recipeMessages.constants";
import {
  IngredientSearchParams,
  IRecipeApiService,
  RecipeAutocompleteResult,
  RecipeByIngredientsResult,
  RecipeDetails,
  RecipeSearchParams,
  RecipeSummary,
} from "./IRecipeApiService";
import {
  RecipeApiDefaults,
  RecipeApiEndpoints,
} from "../../../constants/recipeApi.constants";
import {
  RecipeAutocompleteApiResponse,
  RecipeByIngredientsApiResponse,
  RecipeDetailsApiResponse,
  RecipeSearchApiResponse,
} from "../responses/RecipeApiServiceResponses";

export class SpoonacularService implements IRecipeApiService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: env.SPOONACULAR_BASE_URL,
      timeout: RecipeApiDefaults.REQUEST_TIMEOUT,
      params: { apiKey: env.SPOONACULAR_API_KEY },
    });
  }

  public async searchRecipes(
    params: RecipeSearchParams,
  ): Promise<{ results: RecipeSummary[]; totalResults: number }> {
    const offset = (params.page - 1) * params.limit;

    const data = await this.request<RecipeSearchApiResponse>(
      RecipeApiEndpoints.SEARCH,
      {
        query: params.query,
        number: params.limit,
        offset,
      },
    );

    return {
      results: data.results.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        imageType: item.imageType,
      })),
      totalResults: data.totalResults,
    };
  }

  public async getRecipeDetails(recipeId: number): Promise<RecipeDetails> {
    const data = await this.request<RecipeDetailsApiResponse>(
      RecipeApiEndpoints.DETAILS(recipeId),
      {},
    );

    return {
      id: data.id,
      title: data.title,
      image: data.image,
      summary: data.summary,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      ingredients: data.extendedIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
      instructions: data.instructions,
    };
  }

  public async autocompleteRecipes(
    query: string,
  ): Promise<RecipeAutocompleteResult[]> {
    const data = await this.request<RecipeAutocompleteApiResponse[]>(
      RecipeApiEndpoints.AUTOCOMPLETE,
      {
        query,
        number: RecipeApiDefaults.AUTOCOMPLETE_LIMIT,
      },
    );

    return data.map((item) => ({ id: item.id, title: item.title }));
  }

  public async searchByIngredients(
    params: IngredientSearchParams,
  ): Promise<RecipeByIngredientsResult[]> {
    const data = await this.request<RecipeByIngredientsApiResponse[]>(
      RecipeApiEndpoints.BY_INGREDIENTS,
      {
        ingredients: params.ingredients.join(","),
        number: RecipeApiDefaults.INGREDIENT_SEARCH_LIMIT,
      },
    );

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      usedIngredientCount: item.usedIngredientCount,
      missedIngredientCount: item.missedIngredientCount,
    }));
  }

  private async request<TResponse>(
    endpoint: string,
    queryParams: Record<string, string | number>,
  ): Promise<TResponse> {
    try {
      const response = await this.httpClient.get<TResponse>(endpoint, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      this.handleRequestError(error, endpoint);
    }
  }

  private handleRequestError(error: unknown, endpoint: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpStatus.NOT_FOUND) {
        logger.warn(`Spoonacular resource not found: endpoint=${endpoint}`);
        throw new ApiError(HttpStatus.NOT_FOUND, RecipeMessages.NOT_FOUND);
      }

      if (axiosError.code === "ECONNABORTED" || !axiosError.response) {
        logger.error(`Spoonacular network failure: endpoint=${endpoint}`);
        throw new ApiError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          RecipeMessages.PROVIDER_UNAVAILABLE,
        );
      }

      logger.error(
        `Spoonacular API error: endpoint=${endpoint}, status=${axiosError.response.status}`,
      );
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        RecipeMessages.PROVIDER_ERROR,
      );
    }

    logger.error(
      `Unexpected error while calling Spoonacular: endpoint=${endpoint}`,
    );
    throw new ApiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      RecipeMessages.PROVIDER_ERROR,
    );
  }
}
