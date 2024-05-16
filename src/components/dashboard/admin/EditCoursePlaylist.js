"use client";

import decryptLink from "@/helpers/decryptLink";
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

  return (
    <div>
      <h2 className="font-bold mb-4 text-2xl">Update Course Playlist</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        )}

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-600">
            Course Name:
          </p>
          <p className="w-full border mt-1 px-2 py-2 cursor-not-allowed">
            {data?.course_id?.title}
          </p>
        </div>

        {/* Course selection field */}
        {/* {data?.course_id && (
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
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))
              )}
            </select>
          </div>
        )} */}

        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-600">
            Playlist Link:
          </label>
          <input
            type="text"
            required
            name="playlist_link"
            {...register("playlist_link")}
            defaultValue={decryptLink(data?.playlist_link)}
            className="mt-1 p-2 w-full  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
