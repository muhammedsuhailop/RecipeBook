import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import {
  selectSuggestions,
  selectSuggestionsLoading,
} from "@/features/recipes/store/recipeSelectors";
import { clearSuggestions } from "@/features/recipes/store/recipeSlice";
import { fetchRecipeSuggestions } from "@/features/recipes/store/recipeThunks";
import type { RecipeSuggestion } from "@/features/recipes/types/recipe.types";

const MIN_LENGTH = 2;
const DEBOUNCE_MS = 350;

interface UseRecipeSuggestionsResult {
  suggestions: RecipeSuggestion[];
  loading: boolean;
}

export function useRecipeSuggestions(
  rawQuery: string,
): UseRecipeSuggestionsResult {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector(selectSuggestions);
  const loading = useAppSelector(selectSuggestionsLoading);
  const debounced = useDebouncedValue(rawQuery.trim(), DEBOUNCE_MS);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    controllerRef.current?.abort();
    if (debounced.length < MIN_LENGTH) {
      dispatch(clearSuggestions());
      return;
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    void dispatch(
      fetchRecipeSuggestions({ query: debounced, signal: controller.signal }),
    );
    return () => {
      controller.abort();
    };
  }, [debounced, dispatch]);

  return { suggestions, loading };
}
