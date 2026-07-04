import { Router } from "express";
import { favoriteController } from "../../../container/favorite.container";
import { validateRequest } from "../../../middleware/validateRequest";
import { validateParams } from "../../../middleware/validateParams";
import { asyncHandler } from "../../../middleware/asyncHandler";
import { authMiddleware } from "../../../middleware/auth.middleware";
import {
  createFavoriteSchema,
  removeFavoriteParamSchema,
} from "../validations/favorite.validation";

const router = Router();
router.use(authMiddleware);

router.post(
  "/",
  validateRequest(createFavoriteSchema),
  asyncHandler(favoriteController.addFavorite),
);

router.get("/", asyncHandler(favoriteController.getFavorites));

router.delete(
  "/:recipeId",
  validateParams(removeFavoriteParamSchema),
  asyncHandler(favoriteController.removeFavorite),
);

export { router as favoritesRouter };
