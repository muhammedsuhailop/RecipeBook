import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectRecipeById,
  selectRecipeDetailsError,
  selectRecipeDetailsLoadingId,
} from "@/features/recipes/store/recipeSelectors";
import { fetchRecipeDetails } from "@/features/recipes/store/recipeThunks";
import type { RecipeDetails } from "@/features/recipes/types/recipe.types";

export function useRecipeDetails(recipeId: number) {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectRecipeById(recipeId));
  const loadingId = useAppSelector(selectRecipeDetailsLoadingId);
  const error = useAppSelector(selectRecipeDetailsError);

  const controllerRef = useRef<AbortController | null>(null);

  const activeIdRef = useRef<number | null>(null);

  const load = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    void dispatch(fetchRecipeDetails({ recipeId, signal: controller.signal }));
  }, [dispatch, recipeId]);

  useEffect(() => {
    if (!Number.isFinite(recipeId)) return;

    activeIdRef.current = recipeId;

    if (!recipe) {
      load();
    }

    return () => {
      controllerRef.current?.abort();
      activeIdRef.current = null;
    };
  }, [recipeId, recipe, load]);

  const isCanceledError = Boolean(
    error &&
    (error.toLowerCase().includes("cancel") ||
      error.toLowerCase().includes("abort")),
  );

  const isEffectivelyLoading =
    loadingId === recipeId ||
    (activeIdRef.current !== recipeId && !recipe) ||
    (!recipe && isCanceledError);

  const actualError = isEffectivelyLoading ? null : error;

  return {
    recipe,
    loading: isEffectivelyLoading,
    error: actualError,
    refetch: load,
  };
}
