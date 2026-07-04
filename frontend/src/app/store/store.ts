import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/store/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type { RootState } from "@/app/store/rootReducer";
