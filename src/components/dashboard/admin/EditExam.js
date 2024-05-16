"use client";

import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import {
  useGetSingleExamQuery,
  useUpdateExamMutation,
} from "@/redux/api/examsApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditExam = ({ id }) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { data } = useGetSingleExamQuery(id);
  const [updateExam] = useUpdateExamMutation();
  const { data: courses, isLoading, isError } = useGetAllCoursesQuery();
  const courseData = courses?.courses?.data;
  const onSubmit = async (data) => {
    data.total_marks = Number(data?.total_marks);
    data.duration_in_minutes = Number(data?.duration_in_minutes);
    data.fee = Number(data?.fee);
    data.is_active = Boolean(data?.is_active);

    try {
      const res = await updateExam({ id, body: data });

      if (res?.data?._id === id) {
        toast.success("Exam updated successfully");
        router.push("/admin/addexams");
      } else {
        toast.error("Something is wrong to update exam");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title,
    description: data?.description,
    total_marks: data?.total_marks,
    duration_in_minutes: data?.duration_in_minutes,
    fee: data?.fee,
    is_active: data?.is_active,
    exam_type: data?.exam_type,
    course_id: data?.course_id?._id,
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">You can Edit Exam</h2>

      <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        {data?.course_id && (
          <div className="mb-4">
            <label className="block text-sm mb-2">Select the Course</label>
            <select
              {...register("course_id")}
              defaultValue={data?.course_id}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="" disabled>
                Select a Course
              </option>
              {courseData?.map((course) => (
                <option key={course?.id} value={course?._id}>
                  {course?.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {data?.title && (
          <div className="mb-4">
            <label className="block text-sm mb-2">Exam Name</label>
            <input
              type="text"
              name="title"
              required
              {...register("title")}
              defaultValue={data?.title}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
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
              id="description"
              name="description"
              {...register("description")}
              defaultValue={data?.description}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        )}
        {data?.total_marks && (
          <div className="mb-4">
            <label
              htmlFor="total_marks"
              className="block text-sm font-medium text-gray-600"
            >
              Total Marks
            </label>
            <input
              type="number"
              id="total_marks"
              name="total_marks"
              required
              {...register("total_marks")}
              defaultValue={data?.total_marks}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
        {data?.duration_in_minutes && (
          <div className="mb-4">
            <label
              htmlFor="duration_in_minutes"
              className="block text-sm font-medium text-gray-600"
            >
              Duration in Minutes
            </label>
            <input
              type="number"
              id="duration_in_minutes"
              name="duration_in_minutes"
              required
              {...register("duration_in_minutes")}
              defaultValue={data?.duration_in_minutes}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
        {data?.fee && (
          <div className="mb-4">
            <label
              htmlFor="fee"
              className="block text-sm font-medium text-gray-600"
            >
              Fee
            </label>
            <input
              type="number"
              id="fee"
              name="fee"
              required
              {...register("fee")}
              defaultValue={data?.fee}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
        {data?.is_active && (
          <div className="mb-4">
            <label
              htmlFor="is_active"
              className="block text-sm font-medium text-gray-600"
            >
              Is Active
            </label>
            <select
              id="is_active"
              name="is_active"
              {...register("is_active")}
              defaultValue={data?.is_active}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Exam
              </option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        )}
        {data?.exam_type && (
          <div className="mb-4">
            <label
              htmlFor="exam_type"
              className="block text-sm font-medium text-gray-600"
            >
              Exam Type
            </label>
            <select
              id="exam_type"
              name="exam_type"
              {...register("exam_type")}
              defaultValue={data?.exam_type}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Exam Type
              </option>
              <option value="0">Quiz Exam</option>
              <option value="1">Written Exam</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
        >
          Update Exam
        </button>
      </form>
    </div>
  );
};

export default EditExam;
