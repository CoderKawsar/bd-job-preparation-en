import { baseApi } from "./baseApi";

export const COURSES_URL = "/courses";
export const COURSE_SUBSCRIPTIONS_URL = "/subscriptions";
export const COURSE_SUBSCRIPTIONS_HISTORY_URL = "/subscription-histories";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all courses
    getAllCourses: build.query({
      query: (arg) => {
        return {
          url: COURSES_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          courses: response,
          meta,
        };
      },
      providesTags: ["courses"],
    }),

    getAllCoursesRoutine: build.query({
      query: (arg) => {
        return {
          url: `${COURSES_URL}/routines`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          routines: response,
          meta,
        };
      },
      providesTags: ["courses"],
    }),

    getSingleCourse: build.query({
      query: (id) => ({
        url: `${COURSES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSES_URL,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: ["courses"],
    }),
    deleteCourses: build.mutation({
      query: (categoryId) => ({
        url: `${COURSES_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),
    // update courses
    updateCourse: build.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.id}`,
        // contentType: "multipart/form-data",
        method: "PATCH",
        contentType: "multipart/form-data",
        data: data.body,
      }),
      invalidatesTags: ["courses"],
    }),
    // alll subscript get
    getAllSubscriptions: build.query({
      query: (arg) => ({
        url: COURSE_SUBSCRIPTIONS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          subscriptions: response,
          meta: response.meta,
        };
      },
      providesTags: ["subscriptions"],
    }),
    getAllSubscriptionsHistory: build.query({
      query: (arg) => ({
        url: COURSE_SUBSCRIPTIONS_HISTORY_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          subscriptionsHistory: response,
          meta: response.meta,
        };
      },
      providesTags: ["subscription-histories"],
    }),

    // alll subscript history get
    getMyCourseSubscriptionsHistory: build.query({
      query: (arg) => ({
        url: `${COURSE_SUBSCRIPTIONS_HISTORY_URL}/my-subscription-histories`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          courseSubscription: response,
          meta: response.meta,
        };
      },
      providesTags: ["subscription-histories"],
    }),
    subscribeToCourse: build.mutation({
      query: (data) => ({
        url: COURSE_SUBSCRIPTIONS_HISTORY_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["subscription-histories"],
    }),
    subscribeToCourseBundle: build.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/buy-all-of-a-sub-category`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["subscription-histories"],
    }),

    getAllCoursesBundles: build.query({
      query: (arg) => {
        return {
          url: `${COURSES_URL}/total-cost-of-all-courses-of-a-sub-cat`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          bundles: response,
          meta,
        };
      },
      providesTags: ["courses"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetAllCoursesRoutineQuery,
  useGetSingleCourseQuery,
  useAddCourseMutation,
  useDeleteCoursesMutation,
  useUpdateCourseMutation,
  useGetAllSubscriptionsQuery,
  useGetAllSubscriptionsHistoryQuery,
  useSubscribeToCourseMutation,
  useSubscribeToCourseBundleMutation,
  useGetMyCourseSubscriptionsHistoryQuery,
  useGetAllCoursesBundlesQuery,
} = courseApi;
