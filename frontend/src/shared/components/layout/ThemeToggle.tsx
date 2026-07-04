import type { ReactElement } from "react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/app/providers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all",
        "border-slate-200/70 bg-white/70 text-slate-700 hover:bg-white",
        "dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10",
        "backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
        className,
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
