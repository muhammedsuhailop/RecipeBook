import type { ReactElement } from "react";
import { LogOut, Mail, Phone, User as UserIcon, UtensilsCrossed } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function DashboardPage(): ReactElement {
  const { user, logout, loading } = useAuth();
  const displayName = user?.name ?? "Chef";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">RecipeBook</span>
        </div>
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
            Log out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <section className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Welcome, {displayName}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Here's your RecipeBook Dashbaord
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-1">
          <Card>
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Your profile
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                <UserIcon className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{user?.name ?? "—"}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>{user?.email ?? "—"}</span>
              </li>
              {user?.phone && (
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span>{user.phone}</span>
                </li>
              )}
            </ul>
          </Card>

        </section>
      </main>
    </div>
  );
}
