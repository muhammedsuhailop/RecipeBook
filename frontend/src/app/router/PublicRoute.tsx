import type { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { selectIsAuthenticated } from "@/features/auth/store/authSelectors";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps): ReactElement {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
