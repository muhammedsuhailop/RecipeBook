import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectRecipeById,
  selectRecipeDetailsError,
  selectRecipeDetailsLoadingId,
} from "@/features/recipes/store/recipeSelectors";
import { fetchRecipeDetails } from "@/features/recipes/store/recipeThunks";
import type { RecipeDetails } from "@/features/recipes/types/recipe.types";

interface UseRecipeDetailsResult {
  recipe: RecipeDetails | undefined;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRecipeDetails(recipeId: number): UseRecipeDetailsResult {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectRecipeById(recipeId));
  const loadingId = useAppSelector(selectRecipeDetailsLoadingId);
  const error = useAppSelector(selectRecipeDetailsError);
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    void dispatch(fetchRecipeDetails({ recipeId, signal: controller.signal }));
  }, [dispatch, recipeId]);

  useEffect(() => {
    if (!Number.isFinite(recipeId)) return;
    if (!recipe) load();
    return () => controllerRef.current?.abort();
  }, [recipeId, load]);

  return {
    recipe,
    loading: loadingId === recipeId,
    error,
    refetch: load,
  };
}
