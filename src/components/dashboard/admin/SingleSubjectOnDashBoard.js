import {
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "@/redux/api/subjectApi";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function SingleSubjectOnDashBoard({ subject }) {
  const [updatedTitle, setUpdatedTitle] = useState(subject?.title);

  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const handleUpdateSubject = async () => {
    try {
      // Send the updated title to the backend for the specific subject id
      const payload = { id: subject?._id, body: { title: updatedTitle } };

      const res = await updateSubject(payload); // You need to implement this function

      if (res?.data?._id === subject?.id) {
        // Item updated successfully
        toast.success("Subject updated successfully");
      } else {
        // Something went wrong with updating
        toast.error("Something went wrong with updating");
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
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
        const res = await deleteSubject(id);
        // (res?.data)

        if (res?.data?._id === id) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "Subject has been deleted.",
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
    <div className="flex justify-between bg-white rounded-lg shadow-lg border-b-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateSubject();
        }}
        className="w-full mb-5 flex justify-between"
      >
        <div className="mb-4 w-full">
          <input
            type="text"
            name="title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4 ml-2 w-36">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            আপডেট করুন
          </button>
        </div>
      </form>
      <div className="ml-2">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={() => handleDelete(subject?._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleSubjectOnDashBoard;
