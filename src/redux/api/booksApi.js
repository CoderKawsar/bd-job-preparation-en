import { baseApi } from "./baseApi";

export const BOOKS_URL = "/books";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // all Books
    getAllBooks: build.query({
      query: (arg) => {
        return {
          url: BOOKS_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
      providesTags: ["books"],
    }),

    getSingleBook: build.query({
      query: (id) => ({
        url: `${BOOKS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    ///books/category/:category_id
    getCategoryBooks: build.query({
      query: ({ category_id, args }) => ({
        url: `${BOOKS_URL}/category/${category_id}`,
        method: "GET",
        params: args,
      }),
      providesTags: ["books"],

      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
    }),
    ///books/sub-category/:sub_category_id
    getSubCategoryBooks: build.query({
      query: ({ sub_category_id, args }) => ({
        url: `${BOOKS_URL}/sub-category/${sub_category_id}`,
        method: "GET",
        params: args,
      }),
      providesTags: ["books"],

      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
    }),
    ///books/course/:course_id
    getCourseBooks: build.query({
      query: ({ course_id, args }) => ({
        url: `${BOOKS_URL}/course/${course_id}`,
        method: "GET",
        params: args,
      }),
      providesTags: ["books"],

      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
    }),
    getBooksOfASubject: build.query({
      query: ({ subject_id, args }) => ({
        url: `${BOOKS_URL}/subject/${subject_id}`,
        method: "GET",
        params: args,
      }),
      providesTags: ["books"],

      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
    }),
    getBooksOfAProstuti: build.query({
      query: ({ prostuti_title, args }) => ({
        url: `${BOOKS_URL}/prostuti/${prostuti_title}`,
        method: "GET",
        params: args,
      }),
      providesTags: ["books"],
      transformResponse: (response, meta) => {
        return {
          books: response,
          meta,
        };
      },
    }),
    addBooks: build.mutation({
      query: (data) => ({
        url: BOOKS_URL,
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: ["books"],
    }),

    // update book
    updateBook: build.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.id}`,

        method: "PATCH",
        contentType: "multipart/form-data",
        data: data.body,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBooks: build.mutation({
      query: (id) => ({
        url: `${BOOKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useGetCategoryBooksQuery,
  useGetSubCategoryBooksQuery,
  useGetCourseBooksQuery,
  useGetBooksOfASubjectQuery,
  useGetBooksOfAProstutiQuery,
  useAddBooksMutation,
  useUpdateBookMutation,
  useDeleteBooksMutation,
} = booksApi;
