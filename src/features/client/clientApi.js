import { apiSlice } from "../api/apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => `/customers`,
    }),
    getClient: builder.query({
      query: (id) => `/customers/${id}`,
    }),
    addClient: builder.mutation({
      query: (data) => ({
        url: `/customers`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(Arg, { dispatch, queryFulfilled }) {
        try {
          const client = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getClients", undefined, (draft) => {
              draft.push(client?.data);
            })
          );
        } catch (err) {}
      },
    }),
    editClient: builder.mutation({
      query: ({ clientId, data }) => ({
        url: `/customers/${clientId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const client = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getClients", undefined, (draft) => {
              const index = draft.findIndex((t) => t._id === client?.data?._id);
              if (index != -1) {
                draft[index] = client?.data;
              }
            })
          );
        } catch (err) {}
      },
    }),
    deleteClient: builder.mutation({
      query: (_id) => ({
        url: `/customers/${_id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const clientId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData("getClients", undefined, (draft) => {
              const index = draft.findIndex((t) => t?._id === clientId);
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
        const clientId = arg;
        dispatch(
          apiSlice.util.updateQueryData("getClients", undefined, (draft) => {
            const client = { _id: clientId };
            draft.push(client);
          })
        );
      }
    },
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} = clientApi;
