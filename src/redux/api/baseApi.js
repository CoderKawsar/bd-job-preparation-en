import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),

  tagTypes: [
    "users",
    "shipping-addresses",
    "courses",
    "books",
    "course-playlists-all",
    "quiz-questions",
    "categories",
    "sub-categories",
    "exams",
    "questions",
    "carts",
    "subscriptions",
    "subscription-histories",
    "settings",
    "orders",
    "exam-payments",
    "exam-results",
    "order-status",
    "notice"
  ],
});
