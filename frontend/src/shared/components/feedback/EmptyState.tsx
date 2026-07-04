import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps): ReactElement {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300/70 bg-white/40 px-6 py-16 text-center backdrop-blur",
        "dark:border-slate-700/70 dark:bg-slate-900/40",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 text-orange-600 dark:from-orange-500/10 dark:to-rose-500/10 dark:text-orange-300">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-md text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
