export interface RecipeByIngredientsItemResponse {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

export interface RecipesByIngredientsResponse {
  recipes: RecipeByIngredientsItemResponse[];
}
