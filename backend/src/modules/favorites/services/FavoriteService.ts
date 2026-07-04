import { IFavoriteService } from "./IFavoriteService";
import { IFavoriteRepository } from "../../../repositories/interfaces/IFavoriteRepository";
import { CreateFavoriteDto } from "../dto/CreateFavoriteDto";
import { FavoriteResponse } from "../responses/FavoriteResponse";
import { FavoriteListResponse } from "../responses/FavoriteListResponse";
import { ApiError } from "../../../utils/ApiError";
import { HttpStatus } from "../../../constants/httpStatus.constants";
import { FavoriteMessages } from "../../../constants/favoriteMessages.constants";
import { logger } from "../../../config/logger";
import { IRecipeApiService } from "../../recipes/services/IRecipeApiService";

export class FavoriteService implements IFavoriteService {
  constructor(
    private readonly favoriteRepository: IFavoriteRepository,
    private readonly spoonacularService: IRecipeApiService,
  ) {}

  public async addFavorite(
    dto: CreateFavoriteDto,
    userId: string,
  ): Promise<FavoriteResponse> {
    const existingFavorite =
      await this.favoriteRepository.findByUserIdAndRecipeId(
        userId,
        dto.recipeId,
      );

    if (existingFavorite) {
      throw new ApiError(HttpStatus.CONFLICT, FavoriteMessages.ALREADY_EXISTS);
    }

    const favorite = await this.favoriteRepository.create({
      userId,
      recipeId: dto.recipeId,
    });
    logger.info(`Favorite added: userId=${userId}, recipeId=${dto.recipeId}`);

    return {
      id: favorite.id,
      recipeId: favorite.recipeId,
      createdAt: favorite.createdAt,
    };
  }

  public async getFavorites(userId: string): Promise<FavoriteListResponse> {
    const favorites = await this.favoriteRepository.findAllByUserId(userId);

    if (favorites.length === 0) {
      return { favorites: [], total: 0 };
    }

    const recipeDetails = await Promise.all(
      favorites.map((favorite) =>
        this.spoonacularService.getRecipeDetails(favorite.recipeId),
      ),
    );

    const favoriteRecipes = recipeDetails.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    }));

    return { favorites: favoriteRecipes, total: favoriteRecipes.length };
  }

  public async removeFavorite(recipeId: number, userId: string): Promise<void> {
    const existingFavorite =
      await this.favoriteRepository.findByUserIdAndRecipeId(userId, recipeId);

    if (!existingFavorite) {
      throw new ApiError(HttpStatus.NOT_FOUND, FavoriteMessages.NOT_FOUND);
    }

    await this.favoriteRepository.deleteByUserIdAndRecipeId(userId, recipeId);
    logger.info(`Favorite removed: userId=${userId}, recipeId=${recipeId}`);
  }
}
