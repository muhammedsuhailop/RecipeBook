import type { ReactElement } from "react";
import { RecipeCard } from "@/features/recipes/components/RecipeCard";
import type { RecipeSummary } from "@/features/recipes/types/recipe.types";

interface RecipeGridProps {
  recipes: RecipeSummary[];
}

export function RecipeGrid({ recipes }: RecipeGridProps): ReactElement {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
