import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ChefHat, ArrowRight } from "lucide-react";
import { AppShell } from "@/shared/components/layout/AppShell";

export function DashboardPage(): ReactElement {
  return (
    <AppShell>
      {/* Header Section */}
      <section className="mb-10">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-white/60 px-3 py-1 text-xs font-medium text-orange-700 backdrop-blur dark:border-orange-500/20 dark:bg-white/5 dark:text-orange-300">
            <ChefHat className="h-3.5 w-3.5" />
            Welcome back
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            RecipeBook Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            What would you like to cook today? Explore new recipes or revisit
            your saved favorites.
          </p>
        </div>
      </section>

      {/* Navigation Cards Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {/* Browse Recipes Card */}
        <Link
          to="/recipes"
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/5 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:shadow-black/40 sm:p-8"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 opacity-50 blur-3xl transition-opacity group-hover:opacity-70 dark:from-orange-900/20 dark:to-rose-900/20" />

          <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md">
            <Search className="h-6 w-6" />
          </div>

          <div className="relative flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Discover Recipes
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Search through thousands of dishes by name, ingredient, or cuisine
              to find your next perfect meal.
            </p>
          </div>

          <div className="relative mt-6 flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
            Start searching
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Saved Favorites Card */}
        <Link
          to="/favorites"
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/5 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:shadow-black/40 sm:p-8"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 opacity-50 blur-3xl transition-opacity group-hover:opacity-70 dark:from-rose-900/20 dark:to-purple-900/20" />

          <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-500 text-white shadow-md">
            <Heart className="h-6 w-6" />
          </div>

          <div className="relative flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              My Favorites
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Access your personal recipe book. All the recipes you've loved and
              saved for later, right here.
            </p>
          </div>

          <div className="relative mt-6 flex items-center text-sm font-medium text-rose-600 dark:text-rose-400">
            View saved dishes
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </section>
    </AppShell>
  );
}
