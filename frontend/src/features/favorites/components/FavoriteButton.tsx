import type { MouseEvent, ReactElement } from "react";
import clsx from "clsx";
import { Heart, Loader2 } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";
import {
  selectFavoriteIdSet,
  selectIsFavoritePending,
} from "@/features/favorites/store/favoriteSelectors";
import { useToggleFavorite } from "@/features/favorites/hooks/useFavorites";
import type { FavoriteRecipe } from "@/features/favorites/types/favorite.types";

interface FavoriteButtonProps {
  recipe: FavoriteRecipe;
  variant?: "icon" | "full";
  className?: string;
}

export function FavoriteButton({
  recipe,
  variant = "icon",
  className,
}: FavoriteButtonProps): ReactElement {
  const idSet = useAppSelector(selectFavoriteIdSet);
  const isFavorite = idSet.has(recipe.id);
  const isPending = useAppSelector(selectIsFavoritePending(recipe.id));
  const { toggle } = useToggleFavorite();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    void toggle(recipe, isFavorite);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isFavorite}
        className={clsx(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium transition disabled:opacity-70",
          isFavorite
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-400"
            : "border border-slate-300/70 bg-white/70 text-slate-800 hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-100",
          className,
        )}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={clsx("h-4 w-4", isFavorite && "fill-current")} />
        )}
        {isFavorite ? "Saved" : "Save recipe"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition disabled:opacity-70",
        isFavorite
          ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 hover:bg-rose-400"
          : "bg-white/80 text-slate-700 hover:bg-white dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900",
        className,
      )}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={clsx("h-4 w-4", isFavorite && "fill-current")} />
      )}
    </button>
  );
}
