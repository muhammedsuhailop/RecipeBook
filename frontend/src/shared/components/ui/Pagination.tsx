import type { ReactElement } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function buildRange(
  current: number,
  total: number,
  siblings: number,
): PageItem[] {
  const totalNumbers = siblings * 2 + 5;
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  const items: PageItem[] = [1];
  if (showLeftEllipsis) items.push("ellipsis-left");
  for (let i = leftSibling; i <= rightSibling; i += 1) items.push(i);
  if (showRightEllipsis) items.push("ellipsis-right");
  items.push(total);
  return items;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps): ReactElement | null {
  if (totalPages <= 1) return null;
  const items = buildRange(page, totalPages, siblingCount);

  const go = (next: number): void => {
    if (next < 1 || next > totalPages || next === page) return;
    onPageChange(next);
  };

  const btnBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-white/70 px-3 text-sm font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700/70 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-900";

  return (
    <nav
      className={clsx(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={btnBase}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {items.map((item) => {
        if (item === "ellipsis-left" || item === "ellipsis-right") {
          return (
            <span
              key={item}
              className="px-2 text-sm text-slate-400 dark:text-slate-500"
              aria-hidden
            >
              …
            </span>
          );
        }
        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              btnBase,
              isActive &&
                "!border-transparent !bg-gradient-to-r from-orange-500 to-rose-500 !text-white shadow-md shadow-orange-500/20 hover:!bg-orange-500",
            )}
          >
            {item}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className={btnBase}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
