"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  useAddCourseMutation,
  useDeleteCoursesMutation,
  useGetAllCoursesQuery,
} from "@/redux/api/courseApi";
import Swal from "sweetalert2";
import Link from "next/link";
import Pagination from "../../Pagination";
import checkPermission from "@/utils/checkPermission";
import { useRouter } from "next/navigation";

const AddCourseForm = () => {
  const router = useRouter();

  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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

  const {
    data: courses,
    isLoading: isSubcategoryLoading,
    refetch,
  } = useGetAllCoursesQuery({ limit, page, searchTerm });

  const currentCourses = courses?.courses?.data;

  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);

  //check permission
  useEffect(() => {
    if (!checkPermission("course")) {
      router.push("/");
    }
  }, []);

  const totalData = courses?.courses?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  const [addCourse] = useAddCourseMutation();
  const [deleteCourses] = useDeleteCoursesMutation();

  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    const content = { ...data };

    const file = content["file"];

    const result = JSON.stringify(content);

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);

    try {
      const resultData = await addCourse(formData);

      if (resultData) {
        toast.success("course created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "আপনি এই কোর্সটি মুছে ফেলার বিষয়ে নিশ্চিত?",
        text: "আপনি যদি এটি মুছতে চান তবে 'হ্যাঁ মুছুন' বোতামে ক্লিক করুন অন্যথায় 'বাতিল' বোতামে ক্লিক করুন।",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "হ্যাঁ মুছুন",
        cancelButtonText: "বাতিল",
      });

      if (result.isConfirmed) {
        const res = await deleteCourses(id);

        if (res?.data?._id === id) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <div className="border px-5 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Course Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              {...register("title", { required: true })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Course Instructor:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              {...register("author", { required: true })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category:</label>

            <select
              {...register("category_id", { required: true })}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue("sub_category_id", "");
              }}
              value={selectedCategory}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories?.categories?.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Sub Category:</label>
            <select
              {...register("sub_category_id", { required: false })}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="" disabled>
                Select a category
              </option>
              {allSubcategory?.map((subCategory) => (
                <option key={subCategory?._id} value={subCategory?._id}>
                  {subCategory?.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Membership Type:
            </label>
            <select
              name="membership_type"
              {...register("membership_type", { required: true })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="" disabled>
                Select membership type
              </option>
              <option value="0">Free</option>
              <option value="1">Paid</option>
            </select>
          </div>

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
              {...register("description", { required: true })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Syllabus:
            </label>
            <input
              type="text"
              id="syllabus"
              name="syllabus"
              {...register("syllabus", { required: false })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Class Routine:
            </label>
            <input
              type="text"
              id="routine"
              name="syllabus"
              {...register("routine", { required: false })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Study Materials:
            </label>
            <input
              type="text"
              id="study_materials"
              name="study_materials"
              {...register("study_materials", { required: false })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
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
              {...register("file", { required: true })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            //   onClick={handleAddCourse}
            className="bg-blue-500 w-full text-white px-4 py-2 mt-6 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          >
            Add Course
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mt-12">All Courses</h1>
      <p className="mb-4">You can update and delete courses here</p>
      {isSubcategoryLoading ? (
        <p className="text-center text-xl">Loading courses...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Membership Type</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Banner</th>
                <th className="py-2 px-4 border-b">Update</th>
                <th className="py-2 px-4 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses?.map((course) => (
                <tr key={course._id}>
                  <td className="py-2 px-1 border-b">{course?.title}</td>
                  <td className="py-2 px-4 border-b">{course?.author}</td>
                  <td className="py-2 px-4 border-b">
                    {/* {course?.membership_type} */}
                    {course?.membership_type === "1" ? "Paid" : "Free"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {course?.sub_category_id?.category_id?.title ||
                      course?.category_id?.title}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Image
                      src={course.banner}
                      alt={`Banner for ${course?.title}`}
                      width={100}
                      height={300}
                    />
                  </td>
                  <td className="py-2 px-4 border-b md:table-cell">
                    <Link
                      href={`/admin/addcourse/edit/${course?.id}`}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md"
                    >
                      Update
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b md:table-cell">
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md cursor-pointer"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
