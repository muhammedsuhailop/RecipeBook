import type { RootState } from "@/app/store/store";
import type { AuthState } from "@/features/auth/types/auth.types";
import type { User } from "@/features/auth/types/user.types";

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;
export const selectAuthInitialized = (state: RootState): boolean =>
  state.auth.initialized;
export const selectAuthLoading = (state: RootState): boolean =>
  state.auth.loading;
export const selectAuthUser = (state: RootState): User | null =>
  state.auth.user;
