import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
    }),
    getProduct: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
    getProductByCategory: builder.query({
      query: (category) => `/products?category=${category}`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(Arg, { dispatch, queryFulfilled }) {
        try {
          const product = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              draft.push(product?.data);
            })
          );
        } catch (err) {}
      },
    }),
    editProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const product = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id === product?.data?.id);
              if (index != -1) {
                draft[index] = product?.data;
              }
            })
          );
        } catch (err) {}
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const productId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const index = draft.findIndex((t) => t?.id === productId);
              if (index !== -1) {
                draft.splice(index, 1);
              }
            })
          );
        } catch (error) {}
      },
    }),
    onQueryReturned(arg, { error, dispatch }) {
      if (error) {
        const productId = arg;
        dispatch(
          apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
            const product = { id: productId };
            draft.push(product);
          })
        );
      }
    },
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useGetProductByCategory,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
