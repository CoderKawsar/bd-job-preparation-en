'use client'

import { useGetSingleQuestionQuery, useUpdateQuestionMutation } from "@/redux/api/questionsApi";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateQuestionPage = ({ params }) => {

  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { id } = params;

  const { data } = useGetSingleQuestionQuery(id);
  const [updateQuestion] = useUpdateQuestionMutation();



  const onSubmit = async (data) => {
    try {
      data.mark = Number(data?.mark);
      const res = await updateQuestion({ id, body: data });

      if (res?.data?._id === id) {
        toast.success(" Broad Question updated successfully");
        router.push("/admin/addquestions");
      } else {
        toast.error("Something is wrong to update question");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <>
    <div>
      <h2>Update The Question</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4 mt-2">
            <label className="block text-sm font-medium text-gray-600">
              Question
            </label>
            <input
              required
              type="text"
              name="question"
              {...register("question")}
              defaultValue={data?.question}
              className="mt-1 p-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>




          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Mark
            </label>
            <input
              type="number"
              required
              name="mark"
              {...register("mark")}
              defaultValue={data?.mark}
              className="mt-1 p-2 w-96  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>


          <input
            type="submit"
            value="Update Question"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 cursor-pointer "
          />
        </form>
      </div>
    </div>
    </>
  );
};

export default UpdateQuestionPage;
