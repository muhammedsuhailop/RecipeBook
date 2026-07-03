import type { ReactElement, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { store } from "@/app/store/store";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { AuthInitializer } from "@/app/providers/AuthInitializer";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthInitializer>{children}</AuthInitializer>
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "!bg-white/90 dark:!bg-slate-900/90 !text-slate-900 dark:!text-slate-100 !backdrop-blur !border !border-slate-200/60 dark:!border-slate-700/60",
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}
