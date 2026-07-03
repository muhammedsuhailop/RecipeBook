import { apiClient } from "@/shared/api/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiEndpoints";
import type { ApiResponse } from "@/shared/api/apiTypes";
import type {
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";
import type { User } from "@/features/auth/types/user.types";

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    const { data } = await apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.auth.login,
      payload,
    );
    return data.data;
  },

  async register(payload: RegisterPayload): Promise<User> {
    const { data } = await apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.auth.register,
      payload,
    );
    return data.data;
  },

  async refresh(): Promise<User> {
    const { data } = await apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.auth.refresh,
    );
    return data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post<ApiResponse<void>>(API_ENDPOINTS.auth.logout);
  },
};
