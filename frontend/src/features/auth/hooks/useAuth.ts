import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectAuthInitialized,
  selectAuthLoading,
  selectAuthUser,
  selectIsAuthenticated,
} from "@/features/auth/store/authSelectors";
import { clearAuth } from "@/features/auth/store/authSlice";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "@/features/auth/store/authThunks";
import { onAuthFailure } from "@/shared/api/axios";
import type {
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";
import type { User } from "@/features/auth/types/user.types";

interface UseAuthResult {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialized = useAppSelector(selectAuthInitialized);
  const loading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    const unsubscribe = onAuthFailure(() => {
      dispatch(clearAuth());
      navigate("/login", { replace: true });
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const result = await dispatch(loginUser(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const result = await dispatch(registerUser(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Signed out with connection warnings");
    } finally {
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    initialized,
    loading,
    login,
    register,
    logout,
  };
}
