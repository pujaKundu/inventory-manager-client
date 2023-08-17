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
              const index = draft.findIndex(
                (t) => t._id === product?.data?._id
              );
              if (index != -1) {
                draft[index] = product?.data;
              }
            })
          );
        } catch (err) {}
      },
    }),
    editProductStock: builder.mutation({
      query: ({ productId, stock, totalSales }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: { stock, totalSales },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const product = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const index = draft.findIndex(
                (t) => t._id === product?.data?._id
              );
              if (index != -1) {
                draft[index].stock = product?.data.stock;
                draft[index].totalSales = product?.data.totalSales;
              }
            })
          );
        } catch (err) {}
      },
    }),
    editProductStockPurchase: builder.mutation({
      query: ({ productId, stock, totalOrder }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: { stock, totalOrder },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const product = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const index = draft.findIndex(
                (t) => t._id === product?.data?._id
              );
              if (index != -1) {
                draft[index].stock = product?.data.stock;
                draft[index].totalOrder = product?.data.totalOrder;
              }
            })
          );
        } catch (err) {}
      },
    }),
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const productId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const index = draft.findIndex((t) => t?._id === productId);
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
            const product = { _id: productId };
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
  useEditProductStockMutation,
  useEditProductStockPurchaseMutation,
  useDeleteProductMutation,
} = productsApi;
