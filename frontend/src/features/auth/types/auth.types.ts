import type { User } from "@/features/auth/types/user.types";

export interface AuthState {
  isAuthenticated: boolean;
  initialized: boolean;
  loading: boolean;
  user: User | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}
