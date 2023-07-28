import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
