import { createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "@/features/auth/services/authService";
import type {
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";
import type { User } from "@/features/auth/types/user.types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { API_ENDPOINTS } from "@/shared/constants/apiEndpoints";

export const initializeAuth = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/initialize", async (_, { rejectWithValue }) => {
  try {
    return await authService.refresh();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Not authenticated"));
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>(API_ENDPOINTS.auth.login, async (payload, { rejectWithValue }) => {
  try {
    return await authService.login(payload);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Login failed"));
  }
});

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>(API_ENDPOINTS.auth.register, async (payload, { rejectWithValue }) => {
  try {
    return await authService.register(payload);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Registration failed"));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  API_ENDPOINTS.auth.logout,
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to log out"));
    }
  },
);
