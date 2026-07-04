import { lazy, type ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/auth/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { PublicRoute } from "@/app/router/PublicRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";

const RecipeSearchPage = lazy(() =>
  import("@/features/recipes/pages/RecipeSearchPage").then((m) => ({
    default: m.RecipeSearchPage,
  })),
);
const RecipeDetailsPage = lazy(() =>
  import("@/features/recipes/pages/RecipeDetailsPage").then((m) => ({
    default: m.RecipeDetailsPage,
  })),
);
const FavoritesPage = lazy(() =>
  import("@/features/favorites/pages/FavoritesPage").then((m) => ({
    default: m.FavoritesPage,
  })),
);

export function AppRouter(): ReactElement {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes"
        element={
          <ProtectedRoute>
            <RecipeSearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipes/:recipeId"
        element={
          <ProtectedRoute>
            <RecipeDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
