import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import type {
  RecipeDetails,
  RecipeSuggestion,
  RecipeSummary,
} from "@/features/recipes/types/recipe.types";

const selectRecipesState = (state: RootState) => state.recipes;

export const selectSearchQuery = (state: RootState): string =>
  selectRecipesState(state).search.query;
export const selectSearchPage = (state: RootState): number =>
  selectRecipesState(state).search.page;
export const selectSearchLimit = (state: RootState): number =>
  selectRecipesState(state).search.limit;
export const selectSearchResults = (state: RootState): RecipeSummary[] =>
  selectRecipesState(state).search.results;
export const selectSearchTotal = (state: RootState): number =>
  selectRecipesState(state).search.totalResults;
export const selectSearchLoading = (state: RootState): boolean =>
  selectRecipesState(state).search.loading;
export const selectSearchError = (state: RootState): string | null =>
  selectRecipesState(state).search.error;
export const selectHasSearched = (state: RootState): boolean =>
  selectRecipesState(state).search.hasSearched;

export const selectTotalPages = createSelector(
  [selectSearchTotal, selectSearchLimit],
  (total, limit) => (limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1),
);

export const selectSuggestions = (state: RootState): RecipeSuggestion[] =>
  selectRecipesState(state).suggestions.items;
export const selectSuggestionsLoading = (state: RootState): boolean =>
  selectRecipesState(state).suggestions.loading;

export const selectRecipeById =
  (recipeId: number) =>
  (state: RootState): RecipeDetails | undefined =>
    selectRecipesState(state).details.byId[recipeId];

export const selectRecipeDetailsLoadingId = (state: RootState): number | null =>
  selectRecipesState(state).details.loadingId;
export const selectRecipeDetailsError = (state: RootState): string | null =>
  selectRecipesState(state).details.error;
