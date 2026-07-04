import { createSlice } from "@reduxjs/toolkit";

import { clearAuth } from "@/features/auth/store/authSlice";

import type {
  FavoriteRecipe,
  FavoritesState,
} from "@/features/favorites/types/favorite.types";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "@/features/favorites/store/favoriteThunks";

const initialState: FavoritesState = {
  items: [],
  total: 0,
  loading: false,
  loaded: false,
  error: null,
  pendingIds: {},
};

function removeItem(items: FavoriteRecipe[], id: number): FavoriteRecipe[] {
  return items.filter((item) => item.id !== id);
}

function upsertItem(
  items: FavoriteRecipe[],
  next: FavoriteRecipe,
): FavoriteRecipe[] {
  if (items.some((item) => item.id === next.id)) return items;
  return [next, ...items];
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    resetFavorites: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.items = action.payload.favorites;
        state.total = action.payload.total;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.error = action.payload ?? "Failed to load favorites";
      })
      // Optimistic add
      .addCase(addFavorite.pending, (state, action) => {
        const recipe = action.meta.arg;
        state.pendingIds[recipe.id] = true;
        state.items = upsertItem(state.items, recipe);
        state.total = state.items.length;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        delete state.pendingIds[action.payload.id];
      })
      .addCase(addFavorite.rejected, (state, action) => {
        const recipeId = action.meta.arg.id;
        delete state.pendingIds[recipeId];
        state.items = removeItem(state.items, recipeId);
        state.total = state.items.length;
      })
      // Optimistic remove
      .addCase(removeFavorite.pending, (state, action) => {
        const recipeId = action.meta.arg;
        state.pendingIds[recipeId] = true;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const recipeId = action.payload;
        delete state.pendingIds[recipeId];
        state.items = removeItem(state.items, recipeId);
        state.total = state.items.length;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        const recipeId = action.meta.arg;
        delete state.pendingIds[recipeId];
      })
      .addCase(clearAuth, () => initialState);
  },
});

export const { resetFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
