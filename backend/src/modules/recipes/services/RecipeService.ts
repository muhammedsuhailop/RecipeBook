import { IRecipeService } from "./IRecipeService";
import { SearchRecipesDto } from "../dto/SearchRecipesDto";
import { SearchByIngredientsDto } from "../dto/SearchByIngredientsDto";
import { RecipeSearchResponse } from "../responses/RecipeSearchResponse";
import { RecipeDetailsResponse } from "../responses/RecipeDetailsResponse";
import { RecipeAutocompleteResponse } from "../responses/RecipeAutocompleteResponse";
import { RecipesByIngredientsResponse } from "../responses/RecipesByIngredientsResponse";
import { logger } from "../../../config/logger";
import { IRecipeApiService } from "./IRecipeApiService";

export class RecipeService implements IRecipeService {
  constructor(private readonly spoonacularService: IRecipeApiService) {}

  public async searchRecipes(
    dto: SearchRecipesDto,
  ): Promise<RecipeSearchResponse> {
    const { results, totalResults } =
      await this.spoonacularService.searchRecipes(dto);
    logger.info(
      `Recipe search performed: query=${dto.query}, page=${dto.page}`,
    );

    return {
      recipes: results.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      })),
      totalResults,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public async getRecipeDetails(
    recipeId: number,
  ): Promise<RecipeDetailsResponse> {
    const details = await this.spoonacularService.getRecipeDetails(recipeId);
    logger.info(`Recipe details fetched: recipeId=${recipeId}`);

    return {
      id: details.id,
      title: details.title,
      image: details.image,
      summary: details.summary,
      readyInMinutes: details.readyInMinutes,
      servings: details.servings,
      ingredients: details.ingredients,
      instructions: details.instructions,
    };
  }

  public async autocompleteRecipes(
    query: string,
  ): Promise<RecipeAutocompleteResponse[]> {
    const suggestions =
      await this.spoonacularService.autocompleteRecipes(query);
    return suggestions.map((item) => ({ id: item.id, title: item.title }));
  }

  public async searchByIngredients(
    dto: SearchByIngredientsDto,
  ): Promise<RecipesByIngredientsResponse> {
    const results = await this.spoonacularService.searchByIngredients(dto);
    logger.info(
      `Recipe search by ingredients performed: ingredients=${dto.ingredients.join(",")}`,
    );

    return {
      recipes: results.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        usedIngredientCount: item.usedIngredientCount,
        missedIngredientCount: item.missedIngredientCount,
      })),
    };
  }
}
