import type { ReactElement, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  Heart,
  LogOut,
  Search,
  UtensilsCrossed,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/recipes", label: "Recipes", icon: Search },
  { to: "/favorites", label: "Favorites", icon: Heart },
];

export function AppShell({ children }: AppShellProps): ReactElement {
  const { logout, loading } = useAuth();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-slate-900 dark:text-white"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30">
              <UtensilsCrossed className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              RecipeBook
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white",
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="h-4 w-4" />}
              isLoading={loading}
              onClick={() => {
                void logout();
              }}
            >
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/40 px-4 py-2 md:hidden dark:border-white/5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "inline-flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                  isActive
                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-300"
                    : "text-slate-600 dark:text-slate-300",
                )
              }
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
