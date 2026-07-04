export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh-token",
    logout: "/auth/logout",
  },
  recipes: {
    search: "/recipes",
    autocomplete: "/recipes/autocomplete",
    details: (id: number | string): string => `/recipes/${id}`,
  },
  favorites: {
    list: "/favorites",
    add: "/favorites",
    remove: (recipeId: number | string): string => `/favorites/${recipeId}`,
  },
} as const;
