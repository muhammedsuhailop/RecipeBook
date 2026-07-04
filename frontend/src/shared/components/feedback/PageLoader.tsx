import type { ReactElement } from "react";
import { Spinner } from "@/shared/components/feedback/Spinner";

interface PageLoaderProps {
  label?: string;
}

export function PageLoader({
  label = "Loading…",
}: PageLoaderProps): ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="flex flex-col items-center gap-3 text-slate-600 dark:text-slate-300">
        <Spinner label={label} />
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
}
