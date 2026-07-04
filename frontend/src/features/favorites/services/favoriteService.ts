import { apiClient } from "@/shared/api/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiEndpoints";
import type { ApiResponse } from "@/shared/api/apiTypes";
import type {
  Favorite,
  FavoritesData,
} from "@/features/favorites/types/favorite.types";

export const favoriteService = {
  async list(): Promise<FavoritesData> {
    const { data } = await apiClient.get<ApiResponse<FavoritesData>>(
      API_ENDPOINTS.favorites.list,
    );
    return data.data;
  },

  async add(recipeId: number): Promise<Favorite> {
    const { data } = await apiClient.post<ApiResponse<Favorite>>(
      API_ENDPOINTS.favorites.add,
      { recipeId },
    );
    return data.data;
  },

  async remove(recipeId: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.favorites.remove(recipeId));
  },
};
