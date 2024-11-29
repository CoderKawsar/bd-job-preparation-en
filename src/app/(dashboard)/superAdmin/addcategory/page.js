"use client";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/api/categoryApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Pagination from "../../Pagination";
import checkPermission from "@/utils/checkPermission";

const AdminAddCategory = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories, refetch } = useGetAllCategoriesQuery({
    limit,
    page,
    searchTerm,
  });

  const allCategory = categories?.categories;

  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    // (data)

    const content = { ...data };
    const file = content["file"];
    // (file)
    // delete content['file'];
    const result = JSON.stringify(content);
    // (result, "json");
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);
    // (formData, "formdaata");

    try {
      const resultData = await addCategory(formData);
      // (resultData, "after api call");
      if (resultData?.data?._id) {
        toast.success("category created successfully");
        // router.push("/");
      }
      // (resultData, ' from add category async')
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteCategory(categoryId);
        // (res?.data)

        if (res?.data?._id === categoryId) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          // Something went wrong with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };

  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);

  // ('info', categories);
  // const totalData = questions?.categories?.meta?.total;
  // const totalPages = Math.ceil(totalData / limit);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category Name</label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category Icon</label>
          <input
            type="file"
            name="file"
            {...register("file", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Category
        </button>
      </form>

      <div>
        <h1 className="text-2xl font-bold mb-4 mt-12">Category List</h1>
        {allCategory ? (
          <ul className="border p-5 rounded-md">
            {allCategory?.map((category, i) => (
              <li
                key={category.id}
                className="mb-4 flex items-center justify-between  space-x-10 border py-3 px-5 rounded "
              >
                <div className=" flex items-center ">
                  <h2 className="text-xl font-bold  pr-5">
                    {i + 1}. {category.title}
                  </h2>
                  {/* {category.icon && (
                    <img
                      src={category.icon}
                      // alt='category img'
                      alt={`Icon for ${category.title}`}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  )} */}
                </div>
                <div>
                  <Link
                    href={`/superAdmin/addcategory/edit/${category?._id}`}
                    className="mx-4"
                  >
                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => handleDelete(category?._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found</p>
        )}
      </div>
      {/* <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/> */}
    </div>
  );
};

export default AdminAddCategory;
