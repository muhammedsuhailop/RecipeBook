import { FavoriteModel } from "../models/FavoriteModel";
import { toFavoriteEntity } from "../mappers/favorite.mapper";
import { Favorite } from "../../domain/entities/Favorite";
import {
  IFavoriteRepository,
  CreateFavoritePayload,
} from "../interfaces/IFavoriteRepository";

export class FavoriteRepository implements IFavoriteRepository {
  public async create(payload: CreateFavoritePayload): Promise<Favorite> {
    const document = await FavoriteModel.create(payload);
    return toFavoriteEntity(document);
  }

  public async findByUserIdAndRecipeId(
    userId: string,
    recipeId: number,
  ): Promise<Favorite | null> {
    const document = await FavoriteModel.findOne({ userId, recipeId });
    return document ? toFavoriteEntity(document) : null;
  }

  public async findAllByUserId(userId: string): Promise<Favorite[]> {
    const documents = await FavoriteModel.find({ userId }).sort({
      createdAt: -1,
    });
    return documents.map(toFavoriteEntity);
  }

  public async deleteByUserIdAndRecipeId(
    userId: string,
    recipeId: number,
  ): Promise<void> {
    await FavoriteModel.deleteOne({ userId, recipeId });
  }
}
