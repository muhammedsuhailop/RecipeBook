import { Favorite } from "../../domain/entities/Favorite";
import { ICreateRepository } from "./ICreateRepository";

export interface CreateFavoritePayload {
  userId: string;
  recipeId: number;
}

export interface IFavoriteRepository extends ICreateRepository<
  Favorite,
  CreateFavoritePayload
> {
  findByUserIdAndRecipeId(
    userId: string,
    recipeId: number,
  ): Promise<Favorite | null>;
  findAllByUserId(userId: string): Promise<Favorite[]>;
  deleteByUserIdAndRecipeId(userId: string, recipeId: number): Promise<void>;
}
