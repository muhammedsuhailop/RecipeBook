import { SpoonacularService } from "../modules/recipes/services/SpoonacularService";
import { RecipeService } from "../modules/recipes/services/RecipeService";
import { RecipeController } from "../modules/recipes/controllers/RecipeController";

export const spoonacularService = new SpoonacularService();

const recipeService = new RecipeService(spoonacularService);

export const recipeController = new RecipeController(recipeService);
