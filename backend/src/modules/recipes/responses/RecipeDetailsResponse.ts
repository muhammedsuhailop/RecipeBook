export interface RecipeIngredientResponse {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeDetailsResponse {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  ingredients: RecipeIngredientResponse[];
  instructions: string;
}
