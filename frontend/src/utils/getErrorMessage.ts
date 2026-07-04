import { ApiError } from "@/shared/api/apiTypes";

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (error instanceof ApiError) return error.message || fallback;
  if (error instanceof Error) return error.message || fallback;
  if (typeof error === "string" && error.length > 0) return error;
  return fallback;
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (error instanceof ApiError && error.errors) return error.errors;
  return {};
}
