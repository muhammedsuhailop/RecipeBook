import { Favorite } from "../../domain/entities/Favorite";

export interface CreateFavoritePayload {
  userId: string;
  recipeId: number;
}

export interface IFavoriteRepository {
  create(payload: CreateFavoritePayload): Promise<Favorite>;
  findByUserIdAndRecipeId(
    userId: string,
    recipeId: number,
  ): Promise<Favorite | null>;
  findAllByUserId(userId: string): Promise<Favorite[]>;
  deleteByUserIdAndRecipeId(userId: string, recipeId: number): Promise<void>;
}
