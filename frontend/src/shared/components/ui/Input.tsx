import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftIcon, rightSlot, id, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          "group relative flex items-center rounded-xl border bg-white/70 backdrop-blur transition",
          "dark:bg-slate-900/50",
          error
            ? "border-rose-400/70 focus-within:ring-2 focus-within:ring-rose-300/60"
            : "border-slate-200/80 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300/50 dark:border-slate-700/70",
        )}
      >
        {leftIcon && (
          <span className="pl-3 text-slate-400 dark:text-slate-500">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={clsx(
            "w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400",
            "dark:text-slate-100 dark:placeholder:text-slate-500",
            className,
          )}
          {...rest}
        />
        {rightSlot && <span className="pr-2">{rightSlot}</span>}
      </div>
      {error ? (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-xs font-medium text-rose-500 dark:text-rose-400"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 text-xs text-slate-500 dark:text-slate-400"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
});
