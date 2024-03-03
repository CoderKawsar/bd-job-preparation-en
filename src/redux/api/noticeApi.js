import { baseApi } from "./baseApi";

export const NOTICES_URL = "/notices";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotices: build.query({
      query: (arg) => ({
        url: NOTICES_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          notices: response,
          meta,
        };
      },
      providesTags: ["notice"],
    }),

    getSingleNotice: build.query({
      query: (id) => ({
        url: `${NOTICES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["notice"],
    }),
    addNotice: build.mutation({
      query: (data) => ({
        url: NOTICES_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["notice"],
    }),

    updateNotice: build.mutation({
      query: (data) => ({
        url: `${NOTICES_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["notice"],
    }),

    deleteNotice: build.mutation({
      query: (id) => ({
        url: `${NOTICES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notice"],
    }),
  }),
});

export const {
  useGetAllNoticesQuery,
  useGetSingleNoticeQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation
} = noticeApi;
