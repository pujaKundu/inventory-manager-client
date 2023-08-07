import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import purchaseReducer from "../features/purchase/purchaseSlice";
import suppliersReducer from "../features/suppliers/suppliersSlice";
import clientsReducer from "../features/client/clientSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    products: productsReducer,
    categories: categoriesReducer,
    purchase: purchaseReducer,
    suppliers: suppliersReducer,
    clients:clientsReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
