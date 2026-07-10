import { useCallback, useEffect, type ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { AppShell } from "@/shared/components/layout/AppShell";
import { SearchAutocomplete } from "@/features/recipes/components/SearchAutocomplete";
import { RecipeGrid } from "@/features/recipes/components/RecipeGrid";
import { Pagination } from "@/shared/components/ui/Pagination";
import { SkeletonGrid } from "@/shared/components/feedback/SkeletonCard";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { LoadingOverlay } from "@/shared/components/feedback/LoadingOverlay";
import { useRecipeSearch } from "@/features/recipes/hooks/useRecipeSearch";

export function RecipeSearchPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const urlPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const {
    query,
    page,
    results,
    totalResults,
    totalPages,
    loading,
    error,
    hasSearched,
    search,
    changePage,
    clear,
  } = useRecipeSearch();

  const isSyncing = Boolean(urlQuery && (!hasSearched || urlQuery !== query));
  const isEffectivelyLoading = loading || isSyncing;

  const isCanceledError = Boolean(
    error &&
    (error.toLowerCase().includes("cancel") ||
      error.toLowerCase().includes("abort")),
  );

  useEffect(() => {
    if (!urlQuery) return;
    if (urlQuery === query && urlPage === page && hasSearched) return;
    search(urlQuery, urlPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery, urlPage]);

  const handleSubmit = useCallback(
    (nextQuery: string) => {
      setSearchParams({ q: nextQuery, page: "1" });
      search(nextQuery, 1);
    },
    [setSearchParams, search],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setSearchParams({ q: query, page: String(nextPage) });
      changePage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSearchParams, changePage, query],
  );

  const handleClearResults = () => {
    setSearchParams({});
    clear();
  };

  return (
    <AppShell>
      <section className="mb-8">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-white/60 px-3 py-1 text-xs font-medium text-orange-700 backdrop-blur dark:border-orange-500/20 dark:bg-white/5 dark:text-orange-300">
            <Sparkles className="h-3.5 w-3.5" />
            Discover
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Find your next favorite dish
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Search thousands of recipes by name, ingredient, or cuisine.
          </p>
        </div>

        <div className="sticky top-[72px] z-10 -mx-4 px-4 py-2 md:top-[68px] md:mx-0 md:px-0">
          <SearchAutocomplete initialValue={urlQuery} onSubmit={handleSubmit} />
        </div>
      </section>

      <section className="relative min-h-[300px]">
        {isEffectivelyLoading && results.length === 0 && (
          <SkeletonGrid count={8} />
        )}

        {!isEffectivelyLoading && error && !isCanceledError && (
          <ErrorState message={error} onRetry={() => search(query, page)} />
        )}

        {!isEffectivelyLoading &&
          !error &&
          hasSearched &&
          results.length === 0 && (
            <EmptyState
              icon={<Search className="h-6 w-6" />}
              title="No recipes found"
              description={
                query
                  ? `We couldn't find anything for "${query}". Try a different search.`
                  : "Try searching for a dish or ingredient."
              }
            />
          )}

        {!hasSearched && !isEffectivelyLoading && !error && !urlQuery && (
          <EmptyState
            icon={<Search className="h-6 w-6" />}
            title="Start searching"
            description="Type a dish, ingredient, or cuisine above to get started."
          />
        )}

        {results.length > 0 && (
          <>
            {hasSearched && results.length > 0 && (
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Search Results ({totalResults})
                </h2>
                <button
                  onClick={handleClearResults}
                  className="ml-1 hidden h-9 items-center justify-center rounded-xl bg-gradient-to-r from-slate-500 to-gray-600 px-4 text-sm font-medium text-white shadow-md shadow-slate-500/20 transition hover:from-slate-400 hover:to-gray-500 sm:inline-flex"
                >
                  Clear Results
                </button>
              </div>
            )}
            <div className="mb-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>
                {totalResults.toLocaleString()} result
                {totalResults === 1 ? "" : "s"} for{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  “{query}”
                </span>
              </span>
            </div>

            <div className="relative">
              <div
                className={
                  isEffectivelyLoading ? "opacity-50 transition" : "transition"
                }
              >
                <RecipeGrid recipes={results} />
              </div>
              <LoadingOverlay
                visible={isEffectivelyLoading}
                label="Updating results..."
              />
            </div>

            <div className="mt-10">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </section>
    </AppShell>
  );
}
