import { useMemo, type ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ImageOff, Users } from "lucide-react";
import { AppShell } from "@/shared/components/layout/AppShell";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { LoadingOverlay } from "@/shared/components/feedback/LoadingOverlay";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { useRecipeDetails } from "@/features/recipes/hooks/useRecipeDetails";
import { stripHtml } from "@/utils/sanitizeHtml";

function DetailsSkeleton(): ReactElement {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-72 w-full rounded-3xl bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="h-8 w-2/3 rounded bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="h-4 w-full rounded bg-slate-200/60 dark:bg-slate-800/60" />
      <div className="h-4 w-5/6 rounded bg-slate-200/60 dark:bg-slate-800/60" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-40 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
        <div className="col-span-2 h-40 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
      </div>
    </div>
  );
}

export function RecipeDetailsPage(): ReactElement {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const parsedId = Number(recipeId);
  const { recipe, loading, error, refetch } = useRecipeDetails(parsedId);

  const summaryText = useMemo(
    () => stripHtml(recipe?.summary ?? ""),
    [recipe?.summary],
  );
  const instructionsText = useMemo(
    () => stripHtml(recipe?.instructions ?? ""),
    [recipe?.instructions],
  );
  const instructionLines = useMemo(
    () =>
      instructionsText
        .split(/(?:\.\s+|\n+)/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
    [instructionsText],
  );

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Link
          to="/recipes"
          className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
        >
          Browse more recipes →
        </Link>
      </div>

      {!Number.isFinite(parsedId) ? (
        <ErrorState message="Invalid recipe id" />
      ) : loading && !recipe ? (
        <DetailsSkeleton />
      ) : error && !recipe ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !recipe ? (
        <DetailsSkeleton />
      ) : (
        <article className="space-y-8 relative">
          <LoadingOverlay visible={loading} label="Updating details..." />

          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100 dark:border-slate-700/60 dark:bg-slate-900">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-72 w-full object-cover sm:h-96"
              />
            ) : (
              <div className="flex h-72 w-full items-center justify-center text-slate-400 sm:h-96">
                <ImageOff className="h-10 w-10" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-2xl font-bold text-white sm:text-4xl">
                {recipe.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/90">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {recipe.readyInMinutes} min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {recipe.servings} servings
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FavoriteButton
              variant="full"
              recipe={{
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
              }}
            />
          </div>

          {summaryText && (
            <Card>
              <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                About this recipe
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {summaryText}
              </p>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Ingredients
              </h2>
              {recipe.ingredients.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  No ingredients listed.
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={`${ingredient.id}-${ingredient.name}`}
                      className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                      <span>
                        <span className="font-medium">
                          {ingredient.amount} {ingredient.unit}
                        </span>{" "}
                        {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="lg:col-span-2">
              <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Instructions
              </h2>
              {instructionLines.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  No instructions provided.
                </p>
              ) : (
                <ol className="mt-4 space-y-3">
                  {instructionLines.map((line, index) => (
                    <li
                      key={`${index}-${line.slice(0, 12)}`}
                      className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                        {index + 1}
                      </span>
                      <span>{line}.</span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </div>
        </article>
      )}
    </AppShell>
  );
}
