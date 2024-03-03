"use client";

import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import {
  useGetSingleCoursePlaylistQuery,
  useUpdateCoursePlaylistMutation,
} from "@/redux/api/videoApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditCoursePlylist = ({ id }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const router = useRouter();

  const { data } = useGetSingleCoursePlaylistQuery(id);
  const [updateCoursePlaylist] = useUpdateCoursePlaylistMutation();

  const { data: courses, isLoading, isError } = useGetAllCoursesQuery();
  const courseData = courses?.courses?.data;

  // useEffect(() => {
  //   if (data) {
  //     // banner: data?.file?.name,

  //     setValue("title", data?.title);
  //     setValue("playlist_link", data?.playlist_link);
  //     setValue("course_id", data?.course_id || "");

  //   }
  // }, [data, setValue]);
  const onSubmit = async (data) => {
    data;
    try {
      const res = await updateCoursePlaylist({ id, body: data });
      res;
      if (res?.data?._id === id) {
        toast.success("Course playlist updated successfully");
        router.push("/admin/addvideo");
      } else {
        toast.error("Something is wrong to update course playlist");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title,
    course_id: data?.course_id,
    playlist_link: data?.playlist_link,
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        {data?.title && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              required
              type="text"
              name="title"
              {...register("title")}
              defaultValue={data?.title}
              className="mt-1 p-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        )}

        {/* Course selection field */}
        {data?.course_id && (
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
              {...register("course_id")}
              defaultValue={data?.course_id}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            >
              {courseData?.length === 0 ? (
                <option value="" disabled>
                  No courses available
                </option>
              ) : (
                courseData?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Playlist Link:
          </label>
          <input
            type="text"
            required
            name="playlist_link"
            {...register("playlist_link")}
            defaultValue={data?.playlist_link}
            className="mt-1 p-2 w-96  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <input
          type="submit"
          value="Update Course Playlist"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 cursor-pointer "
        />
      </form>
    </div>
  );
};

export default EditCoursePlylist;
