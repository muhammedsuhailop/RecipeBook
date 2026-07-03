import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: "div" | "section" | "article";
}

export function Card({
  children,
  className,
  ...rest
}: CardProps): ReactElement {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/40 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl",
        "dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/40",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
