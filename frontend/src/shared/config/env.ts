const rawApiUrl = import.meta.env.VITE_API_URL ?? "";

export const env = {
  apiUrl: rawApiUrl,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  enableAutoSuggestion: import.meta.env.VITE_ENABLE_AUTO_SUGGESTION === "true",
} as const;
