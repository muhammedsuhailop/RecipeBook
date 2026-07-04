import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectFavorites,
  selectFavoritesError,
  selectFavoritesLoaded,
  selectFavoritesLoading,
  selectFavoritesTotal,
} from "@/features/favorites/store/favoriteSelectors";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "@/features/favorites/store/favoriteThunks";
import { selectIsAuthenticated } from "@/features/auth/store/authSelectors";
import type { FavoriteRecipe } from "@/features/favorites/types/favorite.types";

interface UseFavoritesResult {
  items: FavoriteRecipe[];
  total: number;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFavorites(auto = true): UseFavoritesResult {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const items = useAppSelector(selectFavorites);
  const total = useAppSelector(selectFavoritesTotal);
  const loading = useAppSelector(selectFavoritesLoading);
  const loaded = useAppSelector(selectFavoritesLoaded);
  const error = useAppSelector(selectFavoritesError);

  const refetch = useCallback(() => {
    void dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (auto && isAuthenticated && !loaded && !loading) {
      void dispatch(fetchFavorites());
    }
  }, [auto, isAuthenticated, loaded, loading, dispatch]);

  return { items, total, loading, loaded, error, refetch };
}

interface UseToggleFavoriteResult {
  toggle: (
    recipe: FavoriteRecipe,
    isCurrentlyFavorite: boolean,
  ) => Promise<void>;
}

export function useToggleFavorite(): UseToggleFavoriteResult {
  const dispatch = useAppDispatch();

  const toggle = useCallback(
    async (recipe: FavoriteRecipe, isCurrentlyFavorite: boolean) => {
      if (isCurrentlyFavorite) {
        const result = await dispatch(removeFavorite(recipe.id));
        if (removeFavorite.fulfilled.match(result)) {
          toast.success("Removed from favorites");
        } else if (removeFavorite.rejected.match(result)) {
          toast.error(result.payload ?? "Failed to remove favorite");
        }
      } else {
        const result = await dispatch(addFavorite(recipe));
        if (addFavorite.fulfilled.match(result)) {
          toast.success("Added to favorites");
        } else if (addFavorite.rejected.match(result)) {
          toast.error(result.payload ?? "Failed to add favorite");
        }
      }
    },
    [dispatch],
  );

  return { toggle };
}
