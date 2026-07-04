import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import clsx from "clsx";
import { Loader2, Search, X } from "lucide-react";
import { useRecipeSuggestions } from "@/features/recipes/hooks/useRecipeSuggestions";

interface SearchAutocompleteProps {
  initialValue?: string;
  onSubmit: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchAutocomplete({
  initialValue = "",
  onSubmit,
  placeholder = "Search recipes, ingredients, cuisines…",
  className,
}: SearchAutocompleteProps): ReactElement {
  const [value, setValue] = useState<string>(initialValue);
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, loading } = useRecipeSuggestions(value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const trimmed = value.trim();
  const showDropdown = useMemo(
    () => open && trimmed.length >= 2,
    [open, trimmed],
  );

  const submit = (query: string): void => {
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
    onSubmit(q);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        const chosen = suggestions[activeIndex].title;
        setValue(chosen);
        submit(chosen);
      } else {
        submit(value);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className={clsx("relative w-full", className)}>
      <div
        className={clsx(
          "flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-4 shadow-sm backdrop-blur transition focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300/50",
          "dark:border-slate-700/70 dark:bg-slate-900/60",
        )}
      >
        <Search className="h-5 w-5 text-slate-400" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="recipe-suggestions"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-12 w-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-base"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
        {value && !loading && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="rounded-md p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => submit(value)}
          className="ml-1 hidden h-9 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 text-sm font-medium text-white shadow-md shadow-orange-500/20 transition hover:from-orange-400 hover:to-rose-400 sm:inline-flex"
        >
          Search
        </button>
      </div>

      {showDropdown && (
        <div
          id="recipe-suggestions"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 shadow-xl backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/95"
        >
          {loading && suggestions.length === 0 && (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading suggestions…
            </div>
          )}
          {!loading && suggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
              No matches for “{trimmed}”
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="max-h-72 overflow-y-auto py-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      setValue(suggestion.title);
                      submit(suggestion.title);
                    }}
                    className={clsx(
                      "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition",
                      index === activeIndex
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60",
                    )}
                  >
                    <Search className="h-3.5 w-3.5 opacity-60" />
                    <span className="truncate">{suggestion.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
