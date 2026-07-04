import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectHasSearched,
  selectSearchError,
  selectSearchLimit,
  selectSearchLoading,
  selectSearchPage,
  selectSearchQuery,
  selectSearchResults,
  selectSearchTotal,
  selectTotalPages,
} from "@/features/recipes/store/recipeSelectors";
import { searchRecipes } from "@/features/recipes/store/recipeThunks";
import type { RecipeSummary } from "@/features/recipes/types/recipe.types";

interface UseRecipeSearchResult {
  query: string;
  page: number;
  limit: number;
  results: RecipeSummary[];
  totalResults: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  search: (query: string, page?: number) => void;
  changePage: (page: number) => void;
}

export function useRecipeSearch(): UseRecipeSearchResult {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectSearchQuery);
  const page = useAppSelector(selectSearchPage);
  const limit = useAppSelector(selectSearchLimit);
  const results = useAppSelector(selectSearchResults);
  const totalResults = useAppSelector(selectSearchTotal);
  const totalPages = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectSearchLoading);
  const error = useAppSelector(selectSearchError);
  const hasSearched = useAppSelector(selectHasSearched);

  const controllerRef = useRef<AbortController | null>(null);

  const run = useCallback(
    (nextQuery: string, nextPage: number) => {
      const trimmed = nextQuery.trim();
      if (!trimmed) return;
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      void dispatch(
        searchRecipes({
          params: { query: trimmed, page: nextPage, limit },
          signal: controller.signal,
        }),
      );
    },
    [dispatch, limit],
  );

  const search = useCallback(
    (nextQuery: string, nextPage = 1) => {
      run(nextQuery, nextPage);
    },
    [run],
  );

  const changePage = useCallback(
    (nextPage: number) => {
      run(query, nextPage);
    },
    [run, query],
  );

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return {
    query,
    page,
    limit,
    results,
    totalResults,
    totalPages,
    loading,
    error,
    hasSearched,
    search,
    changePage,
  };
}
