import { FavoriteRepository } from "../repositories/implementations/FavoriteRepository";
import { FavoriteService } from "../modules/favorites/services/FavoriteService";
import { FavoriteController } from "../modules/favorites/controllers/FavoriteController";
import { spoonacularService } from "./recipe.container";

const favoriteRepository = new FavoriteRepository();

const favoriteService = new FavoriteService(
  favoriteRepository,
  spoonacularService,
);

export const favoriteController = new FavoriteController(favoriteService);
