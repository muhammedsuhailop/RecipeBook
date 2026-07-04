import type { ReactElement } from "react";
import clsx from "clsx";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps): ReactElement {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-3xl border border-rose-200/60 bg-rose-50/60 px-6 py-14 text-center",
        "dark:border-rose-500/20 dark:bg-rose-500/5",
        className,
      )}
      role="alert"
    >
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 max-w-md text-sm text-slate-600 dark:text-slate-400">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
}
