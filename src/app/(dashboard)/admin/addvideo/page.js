"use client";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  useAddPlaylistVideoMutation,
  useDeleteVideoPlaylistMutation,
  useGetAllPlaylistQuery,
} from "@/redux/api/videoApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Pagination from "../../Pagination";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";

const AddVideo = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [addPlaylistVideo] = useAddPlaylistVideoMutation();
  const { data, refetch: refetchPlaylist } = useGetAllPlaylistQuery({ limit, page, searchTerm });
  const coursePLaylists = data?.playlists?.data;


  const [deleteVideoPlaylist] = useDeleteVideoPlaylistMutation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { data: categories, refetch: refetchCategories } = useGetAllCategoriesQuery({ limit, page, searchTerm });

  const { data: subCategories, refetch: refetchSubCategories } =
    useGetAllSubcategoriesQuery({
      category_id: selectedCategory,
      limit, page, searchTerm
    });
  const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategory,
    limit, page, searchTerm
  });
  const allCourse = courses?.courses?.data;



  useEffect(() => {
    refetchPlaylist();
  }, [limit, page, searchTerm]);


  ('info', data?.playlists);

  //check permission
  useEffect(()=>{
    if(!checkPermission('course_video')){

     router.push('/')
    }

  },[])

  const totalData = data?.playlists?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);


  const [initialFormData, setInitialFormData] = useState({
    title: "",
    playlist_link: "",
  });

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...initialFormData,
        category_id: selectedCategory,
        sub_category_id: selectedSubcategory,
        course_id: selectedCourse,
      };

      const res = await addPlaylistVideo(formattedData);

      if (res) {
        toast.success("video playlist added successfully");
      }
    } catch (error) {
      toast.error("Error during POST request:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "আপনি এই প্লেলিস্টটি মুছে ফেলার বিষয়ে নিশ্চিত?",
        text: "আপনি যদি এটি মুছতে চান তবে 'হ্যাঁ মুছুন' বোতামে ক্লিক করুন অন্যথায় 'বাতিল' বোতামে ক্লিক করুন।",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "হ্যাঁ মুছুন",
        cancelButtonText: "বাতিল",
      });
      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteVideoPlaylist(id);
        // (res?.data)

        if (res?.data?._id === id) {
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



  return (
    <div className=" my-8 ">
      <h2 className="text-2xl font-bold mb-4">Add Video PlayList</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            required
            type="text"
            name="title"
            value={initialFormData?.title}
            onChange={(e) =>
              setInitialFormData({ ...initialFormData, title: e.target.value })
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Category selection field */}
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
                <option key={category?.id} value={category?.id}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>

        {/* Sub category selection field */}
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
                <option key={subCategory?.id} value={subCategory?.id}>
                  {subCategory?.title}
                </option>
              ))}
          </select>
        </div>
        {/* Course selection field */}
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
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Playlist Link:
          </label>
          <input
            type="text"
            required
            name="playlist_link"
            value={initialFormData.playlist_link}
            onChange={(e) =>
              setInitialFormData({
                ...initialFormData,
                playlist_link: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
        >
          Add Playlist
        </button>
      </form>

      <div className=" overflow-x-auto mt-10  ">
        <table className="min-w-full  bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Playlist Title</th>
              <th className="py-2 px-4 border-b">Course Title</th>
              <th className="py-2 px-4 border-b">Playlist Link</th>
              <th className="py-2 px-4 border-b">Update</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {coursePLaylists?.map((playlist) => (
              <tr key={playlist._id} className="">
                <td className="py-2 px-4 border-b">{playlist?.title}</td>
                <td className="py-2 px-4 border-b">
                  {playlist?.course_id?.title}
                </td>
                <td className="py-2 pl-2 border-b">
                  <a
                    href={playlist?.playlist_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {playlist.playlist_link}
                  </a>
                </td>
                <td className="py-2 px-4 border-b md:table-cell">
                  <Link href={`/admin/addvideo/edit/${playlist?.id}`} className="bg-blue-500 text-white py-1 px-2 rounded-md">
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => handleDelete(playlist?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />

      </div>
    </div>
  );
};

export default AddVideo;
