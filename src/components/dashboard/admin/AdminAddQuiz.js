import { useState } from "react";
import SeeDynamicQuiz from "./SeeDynamicQuiz";
import { useUpdateStatusChangeMutation } from "@/redux/api/examsApi";
import toast from "react-hot-toast";

const AdminAddQuiz = ({
  quiz,
  i,
  refetch,
  handleDelete,
  filteredQuestions,
}) => {
  const examId = quiz?.exam_id?._id;
  const examTitle = quiz?.exam_id?.title;
  const activeStatus = quiz?.exam_id?.is_active;
  const [updateStatusChange] = useUpdateStatusChangeMutation();
  const [openModal, setOpenModal] = useState(false);
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
      <td className="py-2 px-4 border-b text-center">
        {i + 1}`)` {quiz?.question}
      </td>
      <td className="py-2 px-4 border-b text-center">
        {quiz?.options?.map((option, index) => (
          <div key={index}>
            {Object.keys(option)[0]}: {Object.values(option)[0]}
          </div>
        ))}
      </td>
      <td className="py-2 px-4 border-b text-center">{quiz?.correct_answer}</td>
      <td className="py-2 px-4 border-b text-center">
        <button onClick={() => setOpenModal(true)}>{examTitle}</button>
      </td>
      <td className="py-2 px-4 border-b text-center">
        {activeStatus ? "true" : "false"}
      </td>
      {/* <td className="py-2 px-4 border-b text-center"><button onClick={handleStatusChange} className="bg-green-500 text-white py-1 px-2 rounded-md">Approved Exam</button></td> */}
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
      <td className="py-2 px-4 border-b md:table-cell">
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-md"
          onClick={() => handleDelete(quiz.id)}
        >
          Delete
        </button>
      </td>
      <dialog open={openModal} id={`my_modal_${examId}`} className="modal">
        <SeeDynamicQuiz
          examId={examId}
          filteredQuestions={filteredQuestions}
          examTitle={examTitle}
          setOpenModal={setOpenModal}
        ></SeeDynamicQuiz>
      </dialog>
    </tr>
  );
};
export default AdminAddQuiz;
