import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import { AppShell } from "@/shared/components/layout/AppShell";
import { Button } from "@/shared/components/ui/Button";
import { RecipeGrid } from "@/features/recipes/components/RecipeGrid";
import { SkeletonGrid } from "@/shared/components/feedback/SkeletonCard";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";

export function FavoritesPage(): ReactElement {
  const { items, total, loading, loaded, error, refetch } = useFavorites();

  return (
    <AppShell>
      <section className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-white/60 px-3 py-1 text-xs font-medium text-rose-700 backdrop-blur dark:border-rose-500/20 dark:bg-white/5 dark:text-rose-300">
          <Heart className="h-3.5 w-3.5" />
          Your collection
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Favorites
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {total > 0
            ? `${total} recipe${total === 1 ? "" : "s"} saved for later.`
            : "All the recipes you save will live here."}
        </p>
      </section>

      {loading && !loaded && <SkeletonGrid count={8} />}

      {loaded && error && <ErrorState message={error} onRetry={refetch} />}

      {loaded && !error && items.length === 0 && (
        <EmptyState
          icon={<Heart className="h-6 w-6" />}
          title="No favorites yet"
          description="Save recipes you love and they'll appear here — synced across every page."
          action={
            <Link to="/recipes">
              <Button leftIcon={<Search className="h-4 w-4" />}>
                Browse recipes
              </Button>
            </Link>
          }
        />
      )}

      {items.length > 0 && <RecipeGrid recipes={items} />}
    </AppShell>
  );
}
