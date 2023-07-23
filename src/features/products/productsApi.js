import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
