import { baseApi } from "./baseApi";

export const USERS_URL = "/users";


export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignup: build.mutation({
      query: (loginData) => ({
        url: USERS_URL,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["users"],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["users","carts"],
    }),
    
// get single user
    getSingleUser: build.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

     // update User
    //  updateUser: build.mutation({
    //   query: ({id, ...data}) => ({
    //     url: `${USERS_URL}/${id}`,
    //     method: "PATCH",
    //     data: data
    //   }),

    //   invalidatesTags: ['users']
    // }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data?.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ['users']
    }),

    
  }),
});

export const { useUserSignupMutation, useUserLoginMutation, useGetSingleUserQuery, useUpdateUserMutation } = authApi;
