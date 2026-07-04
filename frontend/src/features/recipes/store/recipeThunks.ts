import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { recipeService } from "@/features/recipes/services/recipeService";
import type {
  RecipeDetails,
  RecipeSuggestion,
  SearchRecipesData,
  SearchRecipesParams,
} from "@/features/recipes/types/recipe.types";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface ThunkExtra {
  rejectValue: string;
}

export const searchRecipes = createAsyncThunk<
  SearchRecipesData,
  { params: SearchRecipesParams; signal?: AbortSignal },
  ThunkExtra
>("recipes/search", async ({ params, signal }, { rejectWithValue }) => {
  try {
    return await recipeService.search(params, { signal });
  } catch (error) {
    if (axios.isCancel(error)) throw error;
    return rejectWithValue(getErrorMessage(error, "Failed to search recipes"));
  }
});

export const fetchRecipeDetails = createAsyncThunk<
  RecipeDetails,
  { recipeId: number; signal?: AbortSignal },
  ThunkExtra
>("recipes/details", async ({ recipeId, signal }, { rejectWithValue }) => {
  try {
    return await recipeService.getDetails(recipeId, { signal });
  } catch (error) {
    if (axios.isCancel(error)) throw error;
    return rejectWithValue(getErrorMessage(error, "Failed to load recipe"));
  }
});

export const fetchRecipeSuggestions = createAsyncThunk<
  RecipeSuggestion[],
  { query: string; signal?: AbortSignal },
  ThunkExtra
>("recipes/suggestions", async ({ query, signal }, { rejectWithValue }) => {
  try {
    return await recipeService.autocomplete(query, { signal });
  } catch (error) {
    if (axios.isCancel(error)) throw error;
    return rejectWithValue(
      getErrorMessage(error, "Failed to load suggestions"),
    );
  }
});
