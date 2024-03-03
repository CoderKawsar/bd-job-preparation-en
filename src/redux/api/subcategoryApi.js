import { baseApi } from "./baseApi";

export const SUBCATEGORIES_URL = "/sub-categories";

export const subcategoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSubcategories: build.query({
            query: (arg) => ({
                url: SUBCATEGORIES_URL,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response, meta) => {
                return {
                    subcategories: response.data,
                    meta,
                };
            },
            providesTags: ["sub-categories"],
        }),

        getSingleSubCategory: build.query({
            query: (id) => ({
              url: `${SUBCATEGORIES_URL}/${id}`,
              method: "GET",
            }),
            providesTags: ["sub-categories"],
          }),

        addSubcategory: build.mutation({
            query: (data) => ({
                url: SUBCATEGORIES_URL,
                method: "POST",
                contentType: "multipart/form-data",
                data: data,
            }),
            invalidatesTags: ["sub-categories"],
        }),

        updateSubCategory: build.mutation({
      
            query: (data) => ({
              url: `${SUBCATEGORIES_URL}/${data.id}`,
              // contentType: "multipart/form-data",
              method: 'PATCH',
              contentType: "multipart/form-data",
              data: data.body,
            }),
            invalidatesTags: ["sub-categories"],
          }),
        deleteSubCategory: build.mutation({
            query: (categoryId) => ({
                url: `${SUBCATEGORIES_URL}/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["sub-categories"],
        }),
    }),
});

export const { useGetAllSubcategoriesQuery, useAddSubcategoryMutation,useGetSingleSubCategoryQuery ,useUpdateSubCategoryMutation,useDeleteSubCategoryMutation } = subcategoryApi;
