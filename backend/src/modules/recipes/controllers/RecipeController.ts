import { Request, Response } from "express";
import { IRecipeService } from "../services/IRecipeService";
import { ApiResponse } from "../../../utils/ApiResponse";
import { HttpStatus } from "../../../constants/httpStatus.constants";
import { RecipeMessages } from "../../../constants/recipeMessages.constants";

export class RecipeController {
  constructor(private readonly recipeService: IRecipeService) {}

  public searchRecipes = async (req: Request, res: Response): Promise<void> => {
    const { query, page, limit } = req.query as unknown as {
      query: string;
      page: number;
      limit: number;
    };
    const result = await this.recipeService.searchRecipes({
      query,
      page,
      limit,
    });
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, RecipeMessages.SEARCH_SUCCESS, result));
  };

  public getRecipeDetails = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { id } = req.params as unknown as { id: number };
    const result = await this.recipeService.getRecipeDetails(id);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, RecipeMessages.DETAILS_SUCCESS, result));
  };

  public autocompleteRecipes = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { query } = req.query as unknown as { query: string };
    const result = await this.recipeService.autocompleteRecipes(query);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, RecipeMessages.AUTOCOMPLETE_SUCCESS, result));
  };

  public searchByIngredients = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { ingredients } = req.query as unknown as { ingredients: string[] };
    const result = await this.recipeService.searchByIngredients({
      ingredients,
    });
    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(true, RecipeMessages.BY_INGREDIENTS_SUCCESS, result),
      );
  };
}
