"use client";

import AllSubjectsPage from "@/components/dashboard/admin/AllSubjectsPage";
import { useAddSubjectMutation } from "@/redux/api/subjectApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminNoticeCreatePage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addSubject] = useAddSubjectMutation();

  const onSubmit = async (data) => {
    try {
      const resultData = await addSubject(data);

      if (resultData?.data?._id) {
        toast.success("Subject added successfully");
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        {" "}
        <h2 className="font-bold text-3xl my-4 w-fit border-b-2 border-gray-300 pb-2">
          {" "}
          Add Subject{" "}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Subject Name</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Subject Name"
            {...register("title", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add
          </button>
        </div>
      </form>
      <AllSubjectsPage />
    </div>
  );
};

export default AdminNoticeCreatePage;
