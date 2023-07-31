import { apiSlice } from "../api/apiSlice";

export const suppliersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => `/suppliers`,
    }),
    getSupplier: builder.query({
      query: (supplierId) => `/suppliers/${supplierId}`,
    }),
    addSupplier: builder.mutation({
      query: (data) => ({
        url: `/suppliers`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(Arg, { dispatch, queryFulfilled }) {
        try {
          const supplier = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getSuppliers",
              undefined,
              (draft) => {
                draft.push(supplier?.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
    editSupplier: builder.mutation({
      query: ({ supplierId, data }) => ({
        url: `/suppliers/${supplierId}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const supplier = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getSuppliers",
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (t) => t.id === supplier?.data?.id
                );
                if (index != -1) {
                  draft[index] = supplier?.data;
                }
              }
            )
          );
        } catch (err) {}
      },
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const supplierId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData(
              "getSuppliers",
              undefined,
              (draft) => {
                const index = draft.findIndex((t) => t?.id === supplierId);
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
        const supplierId = arg;
        dispatch(
          apiSlice.util.updateQueryData("getSuppliers", undefined, (draft) => {
            const supplier = { id: supplierId };
            draft.push(supplier);
          })
        );
      }
    },
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierQuery,
  useAddSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi;
