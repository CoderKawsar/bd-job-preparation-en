"use client";

import { useExamResultQuery } from "@/redux/api/resultApi";
import { useState } from "react";
import GiveMark from "./GiveMark";

const AllExamDetails = ({ item, refetchUserExam }) => {
  const isQuiz = item?.exam_id?.exam_type === "0";
  const examId = item?.exam_id?._id;
  const [modalOpen, setModalOpen] = useState(false);
  const { data: examResult, refetch: refetchExamResult } = useExamResultQuery({
    exam_id: examId,
    user_id: item?.user_id?.id,
  });
  const examResultData = examResult?.exams?.data[0];
  const totalObtainedMarks = examResultData?.question_mark?.reduce(
    (total, mark) => total + mark?.mark_obtained,
    0
  );
  totalObtainedMarks;
  return (
    <tr className="block md:table-row">
      <td className="py-2  px-1 border-b md:table-cell flex">
        {item?.user_id?.name}
      </td>
      <td className="py-2 px-4 border-b md:table-cell">
        {item?.exam_id?.course_id?.title}
      </td>
      <td className="py-2 px-4 border-b md:table-cell">
        {item?.exam_id?.title}
      </td>
      <td className="py-2 px-4 border-b md:table-cell">
        {item?.exam_id?.duration_in_minutes} Minute
      </td>
      <td className="py-2 px-4 border-b md:table-cell">
        {" "}
        {item?.exam_id?.exam_type === "0" ? "Quiz" : "Questions"}
      </td>
      <td className="py-2 px-4 border-b md:table-cell">
        {item?.exam_id?.fee} Taka
      </td>
      <td className="py-2 px-4 border-b md:table-cell">
        {item?.exam_id?.total_marks}
      </td>

      <td className="py-2 px-4 border-b md:table-cell">
        {examResultData?.exam_type === "1" ? (
          <a href={examResultData?.answer} target="blank">
            See Ans
          </a>
        ) : (
          "quiz exam"
        )}
      </td>
      <td>{examResultData?.total_correct_answer || 0}</td>
      <td className="py-2 px-4 border-b md:table-cell">{totalObtainedMarks}</td>
      {/* <td><Link href={`/admin/givemarks/showexam/${item?.id}`} className="py-2 px-4 border-b md:table-cell text-red-500">মার্ক্স দিন</Link  ></td> */}
      <td>
        {isQuiz ? (
          <button>Nothing to do</button>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="py-2 px-4 border-b md:table-cell text-red-500"
          >
            Give Mark
          </button>
        )}
      </td>

      <dialog open={modalOpen} id={`my_modal_${examId}`} className="modal">
        <GiveMark
          examResultData={examResultData}
          examId={examId}
          // refetchUserExam={refetchUserExam}
          refetchExamResult={refetchExamResult}
          studentId={item?.user_id?.id}
          name={item?.user_id?.name}
          setModalOpen={setModalOpen}
        ></GiveMark>
      </dialog>
    </tr>
  );
};

export default AllExamDetails;
