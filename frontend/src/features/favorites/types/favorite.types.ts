export interface FavoriteRecipe {
  id: number;
  title: string;
  image: string;
}

export interface FavoritesData {
  favorites: FavoriteRecipe[];
  total: number;
}

export interface Favorite {
  id: string;
  recipeId: number;
  createdAt: string;
}

export interface FavoritesState {
  items: FavoriteRecipe[];
  total: number;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  pendingIds: Record<number, boolean>;
}
