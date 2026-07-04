const rawApiUrl = import.meta.env.VITE_API_URL ?? "";

export const env = {
  apiUrl: rawApiUrl,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
