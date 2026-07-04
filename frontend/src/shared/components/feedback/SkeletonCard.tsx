import type { ReactElement } from "react";
import clsx from "clsx";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps): ReactElement {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur",
        "dark:border-slate-700/60 dark:bg-slate-900/50",
        className,
      )}
    >
      <div className="aspect-[4/3] w-full animate-pulse bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200/70 dark:bg-slate-800/70" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200/60 dark:bg-slate-800/60" />
        <div className="mt-3 h-8 w-full animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
      </div>
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

export function SkeletonGrid({
  count = 8,
  className,
}: SkeletonGridProps): ReactElement {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
