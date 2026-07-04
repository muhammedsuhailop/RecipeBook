import { FavoriteDocument } from "../models/FavoriteModel";
import { Favorite } from "../../domain/entities/Favorite";

export const toFavoriteEntity = (document: FavoriteDocument): Favorite => {
  return new Favorite(
    document.id as string,
    document.userId.toString(),
    document.recipeId,
    document.createdAt,
  );
};
