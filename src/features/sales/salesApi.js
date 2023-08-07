import { apiSlice } from "../api/apiSlice";

export const salesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => `/orders`,
    }),
    getSale: builder.query({
      query: (orderId) => `/orders/${orderId}`,
    }),
    addSale: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(Arg, { dispatch, queryFulfilled }) {
        try {
          const sale = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getSales", undefined, (draft) => {
              draft.push(sale?.data);
            })
          );
        } catch (err) {}
      },
    }),
    editSale: builder.mutation({
      query: ({ saleId, data }) => ({
        url: `/orders/${saleId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const sale = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getSales", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id === sale?.data?.id);
              if (index != -1) {
                draft[index] = sale?.data;
              }
            })
          );
        } catch (err) {}
      },
    }),
    editSaleStatus: builder.mutation({
      query: ({ saleId, isApproved }) => ({
        url: `/orders/${saleId}`,
        method: "PATCH",
        body: { isApproved },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const sale = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getSales", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id === sale?.data?.id);
              if (index != -1) {
                draft[index].isApproved = sale?.data.isApproved;
              }
            })
          );
        } catch (err) {}
      },
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const saleId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData("getSales", undefined, (draft) => {
              const index = draft.findIndex((t) => t?.id === saleId);
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
        const saleId = arg;
        dispatch(
          apiSlice.util.updateQueryData("getSales", undefined, (draft) => {
            const sale = { id: saleId };
            draft.push(sale);
          })
        );
      }
    },
  }),
});

export const {
  useGetSalesQuery,
  useGetSaleQuery,
  useAddSaleMutation,
  useEditSaleMutation,
  useEditSaleStatusMutation,
  useDeleteSaleMutation,
} = salesApi;
