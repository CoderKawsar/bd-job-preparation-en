import { baseApi } from "./baseApi";

export const QUIZ_PLAYLIST = "/questions";
export const COURSE_PLAYLIST = "/course-playlists";

export const makeQuizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPlaylist: build.query({
      query: (arg) => {
        return {
          url: COURSE_PLAYLIST,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          playlists: response,
          meta,
        };
      },
      providesTags: ["course-playlists-all"],
    }),

    getMyCourseVedioPlaylist: build.query({
      query: (course_id) => {
        return {
          url: `${COURSE_PLAYLIST}/course/${course_id}`,
          method: "GET",
        };
      },

      providesTags: ["course-playlists-all"],
    }),
    getSingleCoursePlaylist: build.query({
      query: (id) => ({
        url: `${COURSE_PLAYLIST}/${id}`,
        method: "GET",
      }),
      providesTags: ["course-playlists-all"],
    }),

    addPlaylistVideo: build.mutation({
      query: (data) => ({
        url: COURSE_PLAYLIST,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["course-playlists-all"],
    }),

    updateCoursePlaylist: build.mutation({
      query: (data) => ({
        url:`${COURSE_PLAYLIST}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["course-playlists-all"],
    }),

    deleteVideoPlaylist: build.mutation({
      query: (id) => ({
        url: `${COURSE_PLAYLIST}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course-playlists-all"],
    }),
  }),
});

export const {
  useAddPlaylistVideoMutation,
  useGetSingleCoursePlaylistQuery,
  useGetMyCourseVedioPlaylistQuery,
  useGetAllPlaylistQuery,
  useUpdateCoursePlaylistMutation,
  useDeleteVideoPlaylistMutation,
} = makeQuizApi;
