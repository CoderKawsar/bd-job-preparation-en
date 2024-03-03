import { baseApi } from "./baseApi";
export const USERS_URL = "/users";
export const SHIPPING_ADDRESS_URL = "/shipping-addresses";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all courses
    // getAllUsers: build.query({
    //   query: (arg) => {
    //     return {
    //       url: USERS_URL,
    //       method: "GET",
    //       params: arg,
    //     };
    //   },
    //   transformResponse: (response, meta) => {
    //     return {
    //       data: response,
    //       meta,
    //     };
    //   },
    //   providesTags: ["users"],
    // }),
    getAllUsers: build.query({
      query: (params) => {
        return {
          url: USERS_URL,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response, meta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["users"],
    }),
    changeRole: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/change-role`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["users"],
    }),
    getMyShippingAddress: build.query({
      query: () => ({
        url: `${SHIPPING_ADDRESS_URL}/my-shipping-address`,
        method: "GET",
      }),
      providesTags: ["shipping-addresses"],
    }),
    addShippingAddress: build.mutation({
      query: (data) => ({
        url: `${SHIPPING_ADDRESS_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["shipping-addresses"],
    }),
    updateShippingAddress: build.mutation({
      query: (payload) => ({
        url: `${SHIPPING_ADDRESS_URL}/update`,
        method: "PATCH",
        data: payload,
      }),

      invalidatesTags: ["shipping-addresses"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    permissionCheck: build.query({
      query: ({ userId, permission }) => ({
        url: `${USERS_URL}/check-permission/${userId}/${permission}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    givePermission: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/give-permission`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["users"],
    }),
    removePermission: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/remove-permission`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useChangeRoleMutation,
  useAddShippingAddressMutation,
  useGetMyShippingAddressQuery,
  useUpdateShippingAddressMutation,
  useDeleteUserMutation,
  usePermissionCheckQuery,
  useGivePermissionMutation,
  useRemovePermissionMutation,
} = usersApi;
