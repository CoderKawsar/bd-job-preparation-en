"use client";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  useAddSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetAllSubscriptionQuery,
} from "@/redux/api/subscriptionApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Pagination from "../../Pagination";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";

const AddSubscription = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, refetch } = useGetAllSubscriptionQuery({
    limit,
    page,
    searchTerm,
  });

  const allSubscription = data?.exams?.data;

  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const [addSubscription] = useAddSubscriptionMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: subCategories, refetch: refetchSubCategories } =
    useGetAllSubcategoriesQuery({
      category_id: selectedCategory,
      limit,
      page,
      searchTerm,
    });
  const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategory,
    limit,
    page,
    searchTerm,
  });

  const allCourse = courses?.courses?.data;

  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);

  const totalData = courses?.courses?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  useEffect(() => {
    refetchSubCategories();
  }, [page, searchTerm, selectedCategory]);

  useEffect(() => {
    refetchCourses();
  }, [page, searchTerm, selectedSubcategory]);

  //check permission
  useEffect(() => {
    if (!checkPermission("subscription")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const subscriptionData = {
      name: event.target.name.value,
      subscription_duration_in_months: parseInt(
        event.target.duration_month.value
      ),
      cost: parseInt(event.target.cost.value),
      course_id: selectedCourse,
    };
    try {
      const response = await addSubscription(subscriptionData);
      if (response) {
        toast.success("Successfully Added Subscription");
      } else {
        toast.error("Not adding subscription");
      }
    } catch (error) {
      toast.error("You are not authorized");
      console.error("Error adding subscription", error);
    }
  };

  const handleSubscriptionDelete = async (categoryId) => {
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
        const res = await deleteSubscription(categoryId);
        // (res?.data)

        if (res?.data?._id === categoryId) {
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
    <div className="container mx-auto w-full">
      <form onSubmit={handleSubmit} className=" p-8 border rounded shadow">
        <h1 className="mb-8 text-3xl font-bold">Add Subscription</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Subscription Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-600"
          >
            Subscription Duration In Month
          </label>
          <input
            required
            type="number"
            id="duration_month"
            name="duration_month"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-600"
          >
            Subscription Cost
          </label>
          <input
            required
            type="number"
            id="cost"
            name="cost"
            placeholder="such as $ 2500"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-600"
          >
            Categories
          </label>
          <select
            id="categories"
            name="categories"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {categories &&
              categories?.categories?.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="subcategories"
            className="block text-sm font-medium text-gray-600"
          >
            Subcategories
          </label>
          <select
            id="subcategories"
            name="subcategories"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            disabled={!selectedCategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="" disabled selected>
              Select a sub category
            </option>
            {!!subCategories &&
              subCategories?.subcategories?.map((subCategory) => (
                <option key={subCategory?._id} value={subCategory?._id}>
                  {subCategory?.title}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="courses"
            className="block text-sm font-medium text-gray-600"
          >
            Select Courses
          </label>
          <select
            id="courses"
            name="courses"
            disabled={!selectedSubcategory}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled selected>
              Select a course
            </option>
            {allCourse?.length === 0 ? (
              <option value="" disabled>
                No courses available
              </option>
            ) : (
              allCourse?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
          >
            Add Subscription
          </button>
        </div>
      </form>

      <div className="mt-8 overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-4">Subscription List</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="lg:border border-gray-300 px-4 py-2">Number</th>
              <th className="lg:border border-gray-300 px-4 py-2">Name</th>
              <th className="lg:border border-gray-300 px-4 py-2">
                Duration (Months)
              </th>
              <th className="lg:border border-gray-300 px-4 py-2">Cost</th>
              <th className="lg:border border-gray-300 px-4 py-2">
                Course Name
              </th>
              <th className="lg:border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allSubscription?.map((subscription, index) => (
              <tr key={subscription._id}>
                <td className="lg:border text-center border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="lg:border text-center border-gray-300 px-4 py-2">
                  {subscription?.name}
                </td>
                <td className="lg:border text-center border-gray-300 px-4 py-2">
                  {subscription?.subscription_duration_in_months}
                </td>
                <td className="lg:border text-center border-gray-300 px-4 py-2">
                  $ {subscription?.cost}
                </td>
                <td className="lg:border text-center border-gray-300 px-4 py-2">
                  {subscription?.course_id?.title}
                </td>
                <td className="lg:border border-gray-300 text-center my-3">
                  <button
                    className="mx-2 px-4 py-1 bg-blue-600 rounded-lg text-white"
                    onClick={() => handleSubscriptionDelete(subscription?.id)}
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
    </div>
  );
};

export default AddSubscription;
