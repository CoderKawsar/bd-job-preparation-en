"use client";
import AllNoticesPage from "@/components/dashboard/admin/AllNoticesPage";
import { useAddNoticeMutation } from "@/redux/api/noticeApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminNoticeCreatePage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addNotice] = useAddNoticeMutation();

  const onSubmit = async (data) => {
    try {
      const resultData = await addNotice(data);

      if (resultData?.data?._id) {
        toast.success("Notice created successfully");
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-4"> নোটিশ যোগ করুন </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Notice Title</label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Notice Description
          </label>
          <textarea
            rows={5}
            type="text"
            name="description"
            {...register("description", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Notice
          </button>
        </div>
      </form>
      <AllNoticesPage />
    </div>
  );
};

export default AdminNoticeCreatePage;
