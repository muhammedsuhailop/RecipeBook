import { createAsyncThunk } from "@reduxjs/toolkit";

import { favoriteService } from "@/features/favorites/services/favoriteService";
import type {
  FavoriteRecipe,
  FavoritesData,
} from "@/features/favorites/types/favorite.types";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface ThunkExtra {
  rejectValue: string;
}

export const fetchFavorites = createAsyncThunk<FavoritesData, void, ThunkExtra>(
  "favorites/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await favoriteService.list();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to load favorites"),
      );
    }
  },
);

export const addFavorite = createAsyncThunk<
  FavoriteRecipe,
  FavoriteRecipe,
  ThunkExtra
>("favorites/add", async (recipe, { rejectWithValue }) => {
  try {
    await favoriteService.add(recipe.id);
    return recipe;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to add favorite"));
  }
});

export const removeFavorite = createAsyncThunk<number, number, ThunkExtra>(
  "favorites/remove",
  async (recipeId, { rejectWithValue }) => {
    try {
      await favoriteService.remove(recipeId);
      return recipeId;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to remove favorite"),
      );
    }
  },
);
