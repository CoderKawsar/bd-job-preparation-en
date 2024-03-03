import { baseApi } from "./baseApi";

export const CART_URL = "/carts";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all carts
    getAllCarts: build.query({
      query: (arg) => {
        return {
          url: CART_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          carts: response,
          meta,
        };
      },
      providesTags: ["carts"],
    }),
    getAllCartsByUser: build.query({
      query: (arg) => {
        return {
          url: `${CART_URL}/my-cart`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          carts: response,
          meta,
        };
      },
      providesTags: ["carts"],
    }),

    addToCart: build.mutation({
      query: (data) => ({
        url: CART_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["carts"],
    }),

    deletecart: build.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllCartsQuery,
  useGetAllCartsByUserQuery,
  useDeletecartMutation,
} = cartApi;
