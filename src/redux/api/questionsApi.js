import { baseApi } from "./baseApi";

export const QUESTIONS_URL = "/questions";

export const questionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuestions: build.query({
      query: (arg) => ({
        url: QUESTIONS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          categories: response,
          meta,
        };
      },
      providesTags: ["questions"],
    }),
    addQuizPlaylist: build.mutation({
      query: (data) => ({
        url: QUESTIONS_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["questions"],
    }),

    getSingleQuestion: build.query({
      query: (id) => ({
        url: `${QUESTIONS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["questions"],
    }),
    getQuestionsOfAnExam: build.query({
      query: (examId) => ({
        url: `${QUESTIONS_URL}/exam/${examId}`,
        method: "GET",
      }),
      providesTags: ["questions"],
    }),

    updateQuestion: build.mutation({
      query: (data) => ({
        url: `${QUESTIONS_URL}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["questions"],
    }),

    deleteQuestions: build.mutation({
      query: (categoryId) => ({
        url: `${QUESTIONS_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),

    // all subscript history get {{local_url}}/questions/exam/:exam_id
    // {{local_url}}/exams/658ff9579106ca03ff6d8aa8/questions
    getMyQuestionsEnrollHistory: build.query({
      query: (id) => ({
        url: `${QUESTIONS_URL}/exam/${id}`,
        method: "GET",

      }),

      providesTags: ["questions"],
    }),


  }),
});

export const { useGetAllQuestionsQuery, useAddQuizPlaylistMutation, useGetQuestionsOfAnExamQuery, useGetSingleQuestionQuery, useUpdateQuestionMutation, useDeleteQuestionsMutation, useGetMyQuestionsEnrollHistoryQuery } = questionsApi;