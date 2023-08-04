import { apiSlice } from "../api/apiSlice";

export const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchases: builder.query({
      query: () => `/purchases`,
    }),
    getPurchase: builder.query({
      query: (purchaseId) => `/purchases/${purchaseId}`,
    }),
    addPurchase: builder.mutation({
      query: (data) => ({
        url: `/purchases`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(Arg, { dispatch, queryFulfilled }) {
        try {
          const purchase = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getPurchases",
              undefined,
              (draft) => {
                draft.push(purchase?.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
    editPurchase: builder.mutation({
      query: ({ purchaseId, data }) => ({
        url: `/purchases/${purchaseId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const purchase = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getPurchases",
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (t) => t.id === purchase?.data?.id
                );
                if (index != -1) {
                  draft[index] = purchase?.data;
                }
              }
            )
          );
        } catch (err) {}
      },
    }),
    editPurchaseStatus: builder.mutation({
      query: ({ purchaseId, isApproved }) => ({
        url: `/purchases/${purchaseId}`,
        method: "PATCH",
        body: { isApproved },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const purchase = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getPurchases",
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (t) => t.id === purchase?.data?.id
                );
                if (index != -1) {
                  draft[index].isApproved = purchase?.data.isApproved;
                }
              }
            )
          );
        } catch (err) {}
      },
    }),
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const purchaseId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData(
              "getPurchases",
              undefined,
              (draft) => {
                const index = draft.findIndex((t) => t?.id === purchaseId);
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
    onQueryReturned(arg, { error, dispatch }) {
      if (error) {
        const purchaseId = arg;
        dispatch(
          apiSlice.util.updateQueryData("getPurchases", undefined, (draft) => {
            const purchase = { id: purchaseId };
            draft.push(purchase);
          })
        );
      }
    },
  }),
});

export const {
  useGetPurchasesQuery,
  useGetPurchaseQuery,
  useAddPurchaseMutation,
  useEditPurchaseMutation,
  useEditPurchaseStatusMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
