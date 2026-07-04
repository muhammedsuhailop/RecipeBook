import { Router } from "express";
import { recipeController } from "../../../container/recipe.container";
import { validateQuery } from "../../../middleware/validateQuery";
import { validateParams } from "../../../middleware/validateParams";
import { asyncHandler } from "../../../middleware/asyncHandler";
import {
  searchRecipesQuerySchema,
  recipeIdParamSchema,
  autocompleteQuerySchema,
  searchByIngredientsQuerySchema,
} from "../validations/recipe.validation";
import { authMiddleware } from "../../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get(
  "/autocomplete",
  validateQuery(autocompleteQuerySchema),
  asyncHandler(recipeController.autocompleteRecipes),
);

router.get(
  "/by-ingredients",
  validateQuery(searchByIngredientsQuerySchema),
  asyncHandler(recipeController.searchByIngredients),
);

router.get(
  "/:id",
  validateParams(recipeIdParamSchema),
  asyncHandler(recipeController.getRecipeDetails),
);

router.get(
  "/",
  validateQuery(searchRecipesQuerySchema),
  asyncHandler(recipeController.searchRecipes),
);

export { router as recipesRouter };
