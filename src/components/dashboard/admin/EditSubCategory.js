"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useGetSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "@/redux/api/subcategoryApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditSubCategory = ({ id }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  // const { id } = params;
  const { register, handleSubmit, reset, setValue } = useForm();
  const { data } = useGetSingleSubCategoryQuery(id);
  const router = useRouter();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery();

  const [updateSubCategory] = useUpdateSubCategoryMutation();

  // (data)

  useEffect(() => {
    if (data) {
      // banner: data?.file?.name,
      setValue("title", data?.title);

      setValue("category_id", data?.category_id || "");
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
      const res = await updateSubCategory({ id, body: formData });

      if (res?.data?._id === id) {
        toast.success(" Sub Category updated successfully");
        router.push("/superAdmin/addsubcategory");
      } else {
        toast.error("Something is wrong updating the category");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title,
    category_id: data?.categoryId,
    icon: data?.file?.name,
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Sub Category Name
          </label>
          {data?.title && (
            <input
              type="text"
              name="title"
              {...register("title")}
              defaultValue={data?.title}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          )}
        </div>
        {data?.category_id && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Category</label>
            {/* <input type="text" defaultValue={data?.category_id?.title} disabled className="cursor-not-allowed w-full border border-gray-300 p-2 rounded-md" /> */}
            {/* <p>{data?.category_id?.title}</p> */}
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
                <option key={category?.id} value={category?.id}>
                  {category?.title}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select

            {...register("category_id")}

            className="w-full border border-gray-300 p-2 rounded-md"
          >
            {categories?.categories?.map((category) => (
              <option key={category?.id} value={category?._id} >
                {category?.title}
              </option>
            ))}
          </select>
          
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Sub Category Icon
          </label>
          <input
            type="file"
            name="file"
            {...register("file")}
            // defaultValue={data?.file?.name}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Update SubCategory
        </button>
      </form>
    </div>
  );
};

export default EditSubCategory;
