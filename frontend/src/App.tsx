import type { ReactElement } from "react";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouter } from "@/app/router/AppRouter";

export default function App(): ReactElement {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
