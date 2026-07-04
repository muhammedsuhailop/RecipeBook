import { CreateFavoriteDto } from "../dto/CreateFavoriteDto";
import { FavoriteResponse } from "../responses/FavoriteResponse";
import { FavoriteListResponse } from "../responses/FavoriteListResponse";

export interface IFavoriteService {
  addFavorite(
    dto: CreateFavoriteDto,
    userId: string,
  ): Promise<FavoriteResponse>;
  getFavorites(userId: string): Promise<FavoriteListResponse>;
  removeFavorite(recipeId: number, userId: string): Promise<void>;
}
