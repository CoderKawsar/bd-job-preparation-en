"use client";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useDeleteCoursesMutation } from "@/redux/api/courseApi";
import { useAddSubcategoryMutation, useDeleteSubCategoryMutation, useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Pagination from "../../Pagination";
const AdminAddSubCategory = () => {
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [addSubcategory] = useAddSubcategoryMutation();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery({ limit, page, searchTerm });

  const { data: subcategories, isLoading: isSubcategoryLoading, refetch } = useGetAllSubcategoriesQuery({ limit, page, searchTerm });

  const allSubcategory = subcategories?.subcategories;

  const [deleteCourses] = useDeleteCoursesMutation()
  const [deleteSubCategory] = useDeleteSubCategoryMutation()


  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);


  // const totalData = questions?.categories?.meta?.total;
  // const totalPages = Math.ceil(totalData / limit);

  const onSubmit = async (data) => {
    // (data);
    const content = { ...data };

    const file = content['file']
    // (file)
    // delete content['file'];
    const result = JSON.stringify(content)
    // (result, "json")
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('data', result);
    // (formData, 'formdaata')
    try {

      const resultData = await addSubcategory(formData)
        (resultData, 'after ap call')
      if (resultData) {
        toast.success("subcategory created successfully");

      }
      // (resultData, ' from add category async')

    } catch (error) {
      toast.error(error.message)

    }

  };
  const handleDelete = async (categoryId) => {
    try {
      await deleteCourses(categoryId);

      // toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");


    }
  };

  return (
    <div className="container mx-auto mt-8">
      {/* <h1 className="text-2xl font-bold mb-4">Add Subcategory</h1> */}
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Subcategory Title
          </label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}

            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Subcategory Icon
          </label>
          <input
            type="file"
            name="file"
            {...register("file", { required: true })}

            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select

            {...register("category_id", { required: true })}

            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.categories?.map((category) => (
              <option key={category?.id} value={category?._id}>
                {category?.title}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
        >
          Add Subcategory
        </button>
      </form> */}
      <h1 className="text-2xl font-bold mb-4 mt-12">Update Sub Category</h1>
      {isSubcategoryLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="hidden md:table-header-group">
              <tr className="text-left">
                <th className="py-2 px-4 border-b">Title</th>
                {/* <th className="py-2 px-4 border-b">Icon</th> */}
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Update</th>
                {/* <th className="py-2 px-4 border-b">Update</th>
                <th className="py-2 px-4 border-b">Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {allSubcategory?.map((subcategory, i) => (
                <tr key={subcategory?._id} className="block md:table-row">
                  <td className="py-2 px-4 border-b md:table-cell">{i + 1}) {subcategory?.title}</td>
                  {/* <td className="py-2 px-4 border-b md:table-cell">
                    <img src={subcategory?.icon} alt="Subcategory Icon" className="w-10 h-10" />
                  </td> */}
                  <td className="py-2 px-4 border-b md:table-cell">{subcategory?.category_id?.title}</td>
                  <td className="py-2 px-4 border-b md:table-cell">
                    <Link href={`/superAdmin/addsubcategory/edit/${subcategory?._id}`} className="bg-blue-500 text-white py-1 px-2 rounded-md">Update</Link>
                  </td>
                  {/*<td className="py-2 px-4 border-b md:table-cell">
                    <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={() => handleDelete(subcategory?.id)}>Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>



          {/* <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/> */}

        </div>


      )}
    </div>
  );
};

export default AdminAddSubCategory;
