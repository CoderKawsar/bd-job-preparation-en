"use client";

import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/api/booksApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditBook = ({ id }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const router = useRouter();
  const { data } = useGetSingleBookQuery(id);

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

  const [updateBook] = useUpdateBookMutation();
  useEffect(() => {
    if (data) {
      // cover_page: data?.file?.name,
      setValue("title", data?.title);
      //   setValue("author", data?.author);
      //   setValue("category_id", data?.category_id || "");
      //   setValue("sub_category_id", data?.sub_category_id || "");
      //   setValue("membership_type", data?.membership_type || "");
      //   setValue("syllabus", data?.syllabus);
      //   setValue("routine", data?.routine);
      //   setValue("description", data?.description);
      //   setValue("study_materials", data?.study_materials);
    }
  }, [data, setValue]);
  const onSubmit = async (data) => {
    data.price = Number(data?.price);
    data.discount_price = Number(data?.discount_price);

    const content = { ...data };
    const file = content["file"];

    const result = JSON.stringify(content);

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);

    try {
      const res = await updateBook({ id, body: formData });

      if (res?.data?._id === id) {
        toast.success("Book updated successfully");
        router.push("/admin/addbooks");
      } else {
        toast.error("Something is wrong updating the book");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title,
    writer: data?.writer,
    price: data?.price,
    discount_price: data?.discount_price,
    // category_id: data?.category_id,
    // sub_category_id: data?.sub_category_id,
    // membership_type: data?.membership_type,
    description: data?.description,
    sample_pdf_link: data?.sample_pdf_link,
    pdf_link: data?.pdf_link,
    format: data?.format,

    cover_page: data?.file?.name,
  };

  return (
    <div>
      <h2>Update Book </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        defaultValues={defaultValues}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Book Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", { required: true })}
            defaultValue={data?.title}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="writer"
            className="block text-sm font-medium text-gray-600"
          >
            Book Author:
          </label>
          <input
            type="text"
            id="writer"
            name="writer"
            {...register("writer")}
            defaultValue={data?.writer}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            {...register("price")}
            defaultValue={data?.price}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="discount_price"
            className="block text-sm font-medium text-gray-600"
          >
            Discount Price:
          </label>
          <input
            type="number"
            id="discount_price"
            name="discount_price"
            {...register("discount_price")}
            defaultValue={data?.discount_price}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            {...register("description")}
            defaultValue={data?.description}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label
            htmlFor="pdf_link"
            className="block text-sm font-medium text-gray-600"
          >
            Sample PDF Link:
          </label>
          <input
            type="text"
            id="sample_pdf_link"
            name="sample_pdf_link"
            {...register("sample_pdf_link")}
            defaultValue={data?.sample_pdf_link}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="format"
            className="block text-sm font-medium text-gray-600"
          >
            Format:
          </label>
          <select
            id="format"
            name="format"
            {...register("format")}
            defaultValue={data?.format}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="hard copy">Hard Copy</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        {/* <div>
          <label
            htmlFor="pdf_link"
            className="block text-sm font-medium text-gray-600"
          >
            PDF Link:
          </label>
          <input
            type="text"
            id="pdf_link"
            name="pdf_link"
            {...register("pdf_link")}
            defaultValue={data?.pdf_link}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div> */}
        {/* Conditionally render PDF Link input based on the selected format */}
        {watch("format") === "pdf" && (
          <div>
            <label
              htmlFor="pdf_link"
              className="block text-sm font-medium text-gray-600"
            >
              PDF Link:
            </label>
            <input
              type="text"
              id="pdf_link"
              name="pdf_link"
              {...register("pdf_link")}
              defaultValue={data?.pdf_link}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        )}

        {/* {repetitionData.map((repetition, repetitionIndex) => (
            <div key={repetitionIndex}>
              {fields.map((field, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select
                      {...register(`categories.${repetitionIndex}.category_id`)}
                      onChange={(e) => {
                        const updatedCategories = [...selectedCategories];
                        updatedCategories[repetitionIndex] = e.target.value;
                        setSelectedCategories(updatedCategories);

                        // Reset subcategory and course when the category changes
                        setValue(`categories.${repetitionIndex}.sub_category_id`, '');
                        setValue(`categories.${repetitionIndex}.course_id`, '');
                      }}
                      value={selectedCategories[repetitionIndex]}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.categories?.map((category) => (
                        <option key={category?.id} value={category?.id}>
                          {category?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Sub Category</label>
                    <select
                      {...register(`categories.${repetitionIndex}.sub_category_id`)}
                      disabled={!selectedCategories[repetitionIndex]}
                      onChange={(e) => {
                        const updatedSubcategories = [...selectedSubcategories];
                        updatedSubcategories[repetitionIndex] = e.target.value;
                        setSelectedSubcategories(updatedSubcategories);

                        // Reset course when the subcategory changes
                        setValue(`categories.${repetitionIndex}.course_id`, '');
                      }}
                      value={selectedSubcategories[repetitionIndex]}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option value="" disabled>
                        Select a subcategory
                      </option>
                      {allSubcategory?.map((subCategory) => (
                        <option key={subCategory?.id} value={subCategory?.id}>
                          {subCategory?.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <label className="block text-sm font-bold mb-2">Course</label>
                    <select
                      disabled={!selectedSubcategories[repetitionIndex]}
                      {...register(`categories.${repetitionIndex}.course_id`)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      {allCourse?.length === 0 ? (
                        <option value="" disabled>
                          No courses available
                        </option>
                      ) : (
                        allCourse?.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course?.title}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <button type="button" onClick={() => removeRepetition(index)} className="text-red-500 mt-2">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ))}


          <button type="button" onClick={addRepetition} className="text-blue-500 mt-2">
            Add More
          </button>  */}
        <div>
          <label
            htmlFor="cover_page"
            className="block text-sm font-medium text-gray-600"
          >
            Cover page Photo:
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
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
