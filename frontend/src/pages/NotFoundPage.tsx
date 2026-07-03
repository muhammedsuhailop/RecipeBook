import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";

export function NotFoundPage(): ReactElement {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          This recipe doesn't exist
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          The page you're looking for may have been moved, renamed, or never
          existed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link to="/">
            <Button>Go home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">Open dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
