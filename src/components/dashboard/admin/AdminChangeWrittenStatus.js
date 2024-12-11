import { useUpdateStatusChangeMutation } from "@/redux/api/examsApi";
import Link from "next/link";
import toast from "react-hot-toast";

const AdminChangeWrittenStatus = ({ refetch, quiz, i, handleDelete }) => {
  const examId = quiz?.exam_id?._id;
  const activeStatus = quiz?.exam_id?.is_active;
  const [updateStatusChange] = useUpdateStatusChangeMutation();
  const handleStatusChange = async () => {
    try {
      const result = await updateStatusChange({
        id: examId,
        is_active: !activeStatus,
      });
      if (result) {
        toast.success("Successfully change the status");
      }
      refetch();
    } catch (error) {
      console.error("Error Updating status", error);
    }
  };
  return (
    <tr>
      <td className="py-2 px-4 border-b">
        {i + 1}`)` {quiz?.question}
      </td>
      <td className="py-2 px-4 border-b text-center">{quiz?.mark}</td>
      <td className="py-2 px-4 border-b text-center">{quiz?.exam_id?.title}</td>
      <td className="py-2 px-4 border-b text-center">
        {quiz?.exam_id?.is_active.toString()}
      </td>
      {/* <td className="py-2 px-4 border-b"><button onClick={handleStatusChange} className="bg-green-500 text-white py-1 px-2 rounded-md">Approved Exam</button></td> */}
      <td className="py-2 px-4 border-b text-center md:table-cell">
        <button
          onClick={handleStatusChange}
          className={`bg-${
            activeStatus ? "green" : "red"
          }-500 text-white py-1 px-2 rounded-md`}
        >
          {activeStatus ? "Approved Exam" : "Pending Approval"}
        </button>
      </td>
      <td className="py-2 px-4 border-b text-center md:table-cell">
        <Link
          href={`/admin/addquestions/edit/${quiz?.id}`}
          className="bg-lime-600 text-white py-2 px-2 rounded-md"
        >
          Update
        </Link>
      </td>
      <td className="py-2 px-4 border-b text-center md:table-cell">
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-md"
          onClick={() => handleDelete(quiz.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminChangeWrittenStatus;
