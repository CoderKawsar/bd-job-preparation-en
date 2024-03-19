"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditCourse = ({ id }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const router = useRouter();
  const { data } = useGetSingleCourseQuery(id);

  const [selectedCategory, setSelectedCategory] = useState("");
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery();

  const {
    data: subcategories,
    isLoading: isLoadingSubcategories,
    isError: isErrorSubcategories,
  } = useGetAllSubcategoriesQuery({
    category_id: selectedCategory,
  });
  const allSubcategory = subcategories?.subcategories;

  const [updateCourse] = useUpdateCourseMutation();
  useEffect(() => {
    if (data) {
      // banner: data?.file?.name,
      setValue("title", data?.title);
      setValue("author", data?.author);
      setValue("category_id", data?.category_id || "");
      setValue("sub_category_id", data?.sub_category_id || "");
      setValue("membership_type", data?.membership_type || "");
      setValue("syllabus", data?.syllabus);
      setValue("routine", data?.routine);
      setValue("description", data?.description);
      setValue("study_materials", data?.study_materials);
    }
  }, [data, setValue]);
  const onSubmit = async (data) => {
    const content = { ...data };
    const file = content["file"];

    const result = JSON.stringify(content);

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);

    try {
      const res = await updateCourse({ id, body: formData });

      if (res?.data?._id === id) {
        toast.success("Course updated successfully");
        router.push("/admin/addcourse");
      } else {
        toast.error("Something is wrong updating the course");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title,
    author: data?.author,
    category_id: data?.category_id,
    sub_category_id: data?.sub_category_id,
    membership_type: data?.membership_type,
    description: data?.description,
    syllabus: data?.syllabus,
    routine: data?.routine,
    study_materials: data?.study_materials,
    banner: data?.file?.name,
  };

  return (
    <div>
      <h2>Update Course </h2>

      <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Course Title:
          </label>
          {data?.title && (
            <input
              type="text"
              id="title"
              name="title"
              {...register("title")}
              defaultValue={data?.title}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Author:
          </label>
          {data?.author && (
            <input
              type="text"
              id="author"
              name="author"
              {...register("author")}
              defaultValue={data?.author}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          )}
        </div>
        {data?.category_id && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Category</label>

            <select
              {...register("category_id")}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue("sub_category_id", "");
              }}
              defaultValue={data?.category_id}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              {categories?.categories?.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.title}
                </option>
              ))}
            </select>
          </div>
        )}
        {data?.sub_category_id && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Sub Category</label>
            <select
              {...register("sub_category_id")}
              className="w-full border border-gray-300 p-2 rounded-md"
              defaultValue={data?.sub_category_id}
            >
              {allSubcategory?.map((subCategory) => (
                <option key={subCategory?._id} value={subCategory?._id}>
                  {subCategory?.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {data?.membership_type && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Membership Type:
            </label>
            <select
              name="membership_type"
              {...register("membership_type")}
              defaultValue={data?.membership_type}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="0">Free</option>
              <option value="1">Paid</option>
            </select>
          </div>
        )}

        {data?.description && (
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
            </label>
            <textarea
              rows={10}
              id="description"
              name="description"
              // theme="snow"
              // modules={{ toolbar: toolbarOptions }}
              {...register("description")}
              defaultValue={data?.description}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        )}
        {data?.syllabus && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Syllabus:
            </label>
            <input
              type="text"
              id="syllabus"
              name="syllabus"
              {...register("syllabus")}
              defaultValue={data?.syllabus}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        )}
        {data?.routine && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Class Routine:
            </label>
            <input
              type="text"
              id="routine"
              name="routine"
              {...register("routine")}
              defaultValue={data?.routine}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        )}
        {data?.study_materials && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Study Materials:
            </label>
            <input
              type="text"
              id="study_materials"
              name="study_materials"
              {...register("study_materials")}
              defaultValue={data?.study_materials}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="banner"
            className="block text-sm font-medium text-gray-600"
          >
            Course Banner:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            {...register("file")}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          //   onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 cursor-pointer"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data, isLoading, isError } = useGetAllCoursesQuery({
//     limit: 10000,
//     page: 1,
//   });
//   return data?.courses?.data?.map((data) => ({ id: data?._id }));
// }

export default EditCourse;
