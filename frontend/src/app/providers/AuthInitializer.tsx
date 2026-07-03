import { useEffect, type ReactElement, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { initializeAuth } from "@/features/auth/store/authThunks";
import { selectAuthInitialized } from "@/features/auth/store/authSelectors";
import { PageLoader } from "@/shared/components/feedback/PageLoader";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({
  children,
}: AuthInitializerProps): ReactElement {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);

  useEffect(() => {
    void dispatch(initializeAuth());
  }, [dispatch]);

  if (!initialized) {
    return <PageLoader label="Preparing your kitchen…" />;
  }

  return <>{children}</>;
}
