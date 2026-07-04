import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { clearAuth } from "@/features/auth/store/authSlice";
import type { RecipesState } from "@/features/recipes/types/recipe.types";
import {
  fetchRecipeDetails,
  fetchRecipeSuggestions,
  searchRecipes,
} from "@/features/recipes/store/recipeThunks";

const initialState: RecipesState = {
  search: {
    query: "",
    page: 1,
    limit: 12,
    results: [],
    totalResults: 0,
    loading: false,
    error: null,
    hasSearched: false,
  },
  details: {
    byId: {},
    loadingId: null,
    error: null,
  },
  suggestions: {
    items: [],
    loading: false,
    error: null,
  },
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search.query = action.payload;
    },
    setSearchPage(state, action: PayloadAction<number>) {
      state.search.page = action.payload;
    },
    clearSuggestions(state) {
      state.suggestions.items = [];
      state.suggestions.error = null;
      state.suggestions.loading = false;
    },
    resetRecipesState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state, action) => {
        state.search.loading = true;
        state.search.error = null;
        state.search.query = action.meta.arg.params.query;
        state.search.page = action.meta.arg.params.page;
        state.search.limit = action.meta.arg.params.limit;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.search.loading = false;
        state.search.results = action.payload.recipes;
        state.search.totalResults = action.payload.totalResults;
        state.search.page = action.payload.page;
        state.search.limit = action.payload.limit;
        state.search.hasSearched = true;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.search.loading = false;
        state.search.error = action.payload ?? "Failed to search recipes";
        state.search.hasSearched = true;
      })
      .addCase(fetchRecipeDetails.pending, (state, action) => {
        state.details.loadingId = action.meta.arg.recipeId;
        state.details.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.details.loadingId = null;
        state.details.byId[action.payload.id] = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.details.loadingId = null;
        state.details.error = action.payload ?? "Failed to load recipe";
      })
      .addCase(fetchRecipeSuggestions.pending, (state) => {
        state.suggestions.loading = true;
        state.suggestions.error = null;
      })
      .addCase(fetchRecipeSuggestions.fulfilled, (state, action) => {
        state.suggestions.loading = false;
        state.suggestions.items = action.payload;
      })
      .addCase(fetchRecipeSuggestions.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.suggestions.loading = false;
        state.suggestions.error = action.payload ?? null;
      })
      .addCase(clearAuth, () => initialState);
  },
});

export const {
  setSearchQuery,
  setSearchPage,
  clearSuggestions,
  resetRecipesState,
} = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
