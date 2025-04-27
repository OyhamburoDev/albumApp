import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "../api/test.service"; // la ruta a tu servicio

export const store = configureStore({
  reducer: {
    [testApi.reducerPath]: testApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware),
});

// Tipos útiles
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
