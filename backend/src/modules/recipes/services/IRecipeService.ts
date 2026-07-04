import { SearchRecipesDto } from "../dto/SearchRecipesDto";
import { SearchByIngredientsDto } from "../dto/SearchByIngredientsDto";
import { RecipeSearchResponse } from "../responses/RecipeSearchResponse";
import { RecipeDetailsResponse } from "../responses/RecipeDetailsResponse";
import { RecipeAutocompleteResponse } from "../responses/RecipeAutocompleteResponse";
import { RecipesByIngredientsResponse } from "../responses/RecipesByIngredientsResponse";

export interface IRecipeService {
  searchRecipes(dto: SearchRecipesDto): Promise<RecipeSearchResponse>;
  getRecipeDetails(recipeId: number): Promise<RecipeDetailsResponse>;
  autocompleteRecipes(query: string): Promise<RecipeAutocompleteResponse[]>;
  searchByIngredients(
    dto: SearchByIngredientsDto,
  ): Promise<RecipesByIngredientsResponse>;
}
