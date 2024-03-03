import { baseApi } from "./baseApi";

export const ORDERS_URL = "/orders";
export const ORDERS_DETAILS_URL = "/order-details";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
     // all orders
     getAllOrders: build.query({
      query: (arg) => {
        return {
          url: ORDERS_DETAILS_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          orders: response,
          meta,
        };
      },
      providesTags: ["orders"],
    }),
    
    addOrder: build.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        data: data,
      }),
      providesTags: ["orders"],
    }),
    deleteSettings: build.mutation({
      query: (settings_id) => ({
        url: `${SETTINGS_URL}/${settings_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useAddOrderMutation,
  useGetAllSettingsQuery,
  useDeleteSettingsMutation,
} = ordersApi;
