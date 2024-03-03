import { baseApi } from "./baseApi";

export const EXAMS_URL = "/exams";
export const EXAM_PAYMENTS_URL = "/exam-payments";

export const examsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExams: build.query({
      query: (arg) => ({
        url: EXAMS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          exams: response,
          meta: response.meta,
        };
      },
      providesTags: ["exams"],
    }),

    payForExam: build.mutation({
      query: (data) => ({
        url: `${EXAM_PAYMENTS_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["exam-payments"],
    }),

    getSingleExam: build.query({
      query: (id) => ({
        url: `${EXAMS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["exams"],
    }),

    addAllExams: build.mutation({
      query: (data) => ({
        url: EXAMS_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["exams"],
    }),

    updateExam: build.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),

      invalidatesTags: ["exams"],
    }),


    deleteExam: build.mutation({
      query: (id) => ({
        url: `${EXAMS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["exams"],
    }),
    //{{local_url}}/exam-payments/my-exam-payments

    getAllUserExams: build.query({
      query: (arg) => ({
        url: EXAM_PAYMENTS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          exams: response,
          meta: response.meta,
        };
      },
      providesTags: ["exam-payments"],
    }),
    getMyExamPayment: build.query({
      query: (arg) => ({
        url: `${EXAM_PAYMENTS_URL}/my-exam-payments`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          payments: response,
          meta: response.meta,
        };
      },
      providesTags: ["exam-payments"],
    }),
    getMyDueExams: build.query({
      query: () => ({
        url: `${EXAMS_URL}/my-due-exams`,
        method: "GET",
      }),
    }),
    updateStatusChange: build.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}/${data?.id}`,
        method: "PATCH",
        data: {
          is_active: data?.is_active,
        },
      }),
      invalidatesTags: ["exams"],
    }),

  }),
});

export const {
  useGetAllExamsQuery,
  useGetSingleExamQuery,
  useDeleteExamMutation,
  useUpdateExamMutation,
  useAddAllExamsMutation,
  usePayForExamMutation,
  useGetMyExamPaymentQuery,
  useGetAllUserExamsQuery,
  useGetMyDueExamsQuery,
  useUpdateStatusChangeMutation
} = examsApi;
