import { memo, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImageOff } from "lucide-react";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import type { RecipeSummary } from "@/features/recipes/types/recipe.types";

interface RecipeCardProps {
  recipe: RecipeSummary;
}

function RecipeCardBase({ recipe }: RecipeCardProps): ReactElement {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:shadow-black/40">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <FavoriteButton recipe={recipe} />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[3rem] text-sm font-semibold text-slate-900 dark:text-white">
          {recipe.title}
        </h3>
        <Link
          to={`/recipes/${recipe.id}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          View details
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

export const RecipeCard = memo(RecipeCardBase);
