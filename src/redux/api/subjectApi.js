import { baseApi } from "./baseApi";

export const SUBJECTS_URL = "/subjects";

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSubjects: build.query({
      query: (arg) => ({
        url: SUBJECTS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          subjects: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["subjects"],
    }),

    getSingleSubject: build.query({
      query: (id) => ({
        url: `${SUBJECTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["subjects"],
    }),
    addSubject: build.mutation({
      query: (data) => ({
        url: SUBJECTS_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["subjects"],
    }),

    updateSubject: build.mutation({
      query: (data) => ({
        url: `${SUBJECTS_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["subjects"],
    }),

    deleteSubject: build.mutation({
      query: (id) => ({
        url: `${SUBJECTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subjects"],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetAllSubjectsQuery,
  useGetSingleSubjectQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
