'use client'

import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditCategory = ({id}) => {
    const { register, handleSubmit, reset } = useForm();
    const {data} = useGetSingleCategoryQuery(id);
    const router = useRouter();

    const [updateCategory] = useUpdateCategoryMutation()
    // (data)

    const onSubmit = async (data) => {
      const content = { ...data };
      const file = content["file"];
      
      const result = JSON.stringify(content);
     
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("data", result);
      
        try {
          const res = await updateCategory({ id, body: formData});
         
          if (res?.data?._id === id) {
            toast.success("Category updated successfully");
            router.push("/superAdmin/addcategory");
          } else {
            toast.error("Something is wrong updating the category");
          }
        } catch (err) {
          toast.error(err.message);
        }
      };

  const defaultValues = {
    title: data?.title,
    icon: data?.file?.name
  };

    return (
        <div>
            


            <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category Name</label>
         {data?.title &&  <input
            type="text"
            name="title"
            {...register("title")}
            defaultValue={data?.title}
            className="w-full border border-gray-300 p-2 rounded-md"
          />}
        </div>
     <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category Icon</label>
          <input
            type="file"
            name="file"
            {...register("file")}
            // defaultValue={data?.file?.name}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Update Category
        </button>
      </form>

        </div>
    );
};

export default EditCategory;