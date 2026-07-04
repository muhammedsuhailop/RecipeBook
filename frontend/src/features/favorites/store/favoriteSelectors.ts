import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";
import type { FavoriteRecipe } from "@/features/favorites/types/favorite.types";

const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavorites = (state: RootState): FavoriteRecipe[] =>
  selectFavoritesState(state).items;
export const selectFavoritesTotal = (state: RootState): number =>
  selectFavoritesState(state).total;
export const selectFavoritesLoading = (state: RootState): boolean =>
  selectFavoritesState(state).loading;
export const selectFavoritesLoaded = (state: RootState): boolean =>
  selectFavoritesState(state).loaded;
export const selectFavoritesError = (state: RootState): string | null =>
  selectFavoritesState(state).error;

export const selectFavoriteIdSet = createSelector(
  [selectFavorites],
  (items) => {
    const set = new Set<number>();
    items.forEach((item) => set.add(item.id));
    return set;
  },
);

export const selectIsFavorite = (recipeId: number) =>
  createSelector([selectFavoriteIdSet], (idSet) => idSet.has(recipeId));

export const selectIsFavoritePending =
  (recipeId: number) =>
  (state: RootState): boolean =>
    Boolean(selectFavoritesState(state).pendingIds[recipeId]);
