import type { ReactElement } from "react";
import { Spinner } from "@/shared/components/feedback/Spinner";

interface LoadingOverlayProps {
  label?: string;
  visible: boolean;
}

export function LoadingOverlay({
  label = "Loading…",
  visible,
}: LoadingOverlayProps): ReactElement | null {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-inherit bg-white/50 backdrop-blur-sm dark:bg-slate-950/40"
    >
      <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-md dark:bg-slate-900/80 dark:text-slate-200">
        <Spinner label={label} />
        <span>{label}</span>
      </div>
    </div>
  );
}
