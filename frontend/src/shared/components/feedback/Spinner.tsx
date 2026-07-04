import type { ReactElement } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({
  className,
  label = "Loading",
}: SpinnerProps): ReactElement {
  return (
    <span
      role="status"
      aria-label={label}
      className={clsx("inline-flex items-center justify-center", className)}
    >
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}
