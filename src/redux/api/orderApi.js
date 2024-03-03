import { baseApi } from "./baseApi";

export const ORDERS_URL = "/order-details";


export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all courses order-details/my-order-details
    getMyAllOrdersDetails: build.query({
      query: (arg) => {
        return {
          url: `${ORDERS_URL}/my-order-details`,
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

    
  }),
});

export const {
  useGetMyAllOrdersDetailsQuery
} = orderApi;
