import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/store/authSlice";
import { favoritesReducer } from "@/features/favorites/store/favoritesSlice";
import { recipesReducer } from "@/features/recipes/store/recipeSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
