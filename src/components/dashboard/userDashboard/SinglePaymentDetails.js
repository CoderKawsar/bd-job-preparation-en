import { useGetSingleExamQuery } from "@/redux/api/examsApi";
import { useGetQuestionsOfAnExamQuery } from "@/redux/api/questionsApi";
import { useSubmitExamUserMutation } from "@/redux/api/resultApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserSeeBroadQuestion from "./UserSeeBroadQuestion";

const SinglePaymentDetails = ({ item }) => {
  const [pdfSubmitted, setPdfSubmitted] = useState(false);
  const examId = item?.exam_id?._id;
  const dateObject = new Date(item?.createdAt);
  const localData = dateObject.toLocaleDateString();
  const { userId } = getUserInfo();
  const { data: examData } = useGetSingleExamQuery(examId);
  const { data: questionData } = useGetQuestionsOfAnExamQuery(examId);
  const [submitExamUser] = useSubmitExamUserMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen1] = useState(false);

  const handleSubmitPdf = async (e) => {
    e.preventDefault();

    const form = e.target;
    const answer = form.answer.value;
    try {
      const payload = {
        user_id: userId,
        exam_id: examId,
        exam_type: examData?.exam_type,
        answer: answer,
        question_id: examData?.id,
        question_mark: [],
        total_marks: examData?.total_marks,
        total_correct_answer: 0,
        total_wrong_answer: 0,
        isApproved: false,
      };
      const { data: submissionData } = await submitExamUser(payload);
      if (submissionData) {
        toast.success("Congratulation, You have successfully submit your ans");
        setPdfSubmitted(true);
        setModalOpen(false);
      } else {
        toast.error("Your submission not successfully submit");
      }

      // Handle the submission response as needed
      "Submission successful:", submissionData;
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };
  // return (
  //     <tr  className="hover">
  //     <th>{item?.exam_id?.course_id?.title} </th>
  //     <td>{item?.exam_id?.title}</td>
  //     <td>{item?.exam_id?.fee}</td>
  //     <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
  //     <td>{localData}</td>
  //     <td>{item?.trx_id}</td>
  //     <td>paid</td>
  //     <td>
  //     <Link href={`/user/myexams/details/${item?.exam_id?.id}`}className="text-red-500 font-bold">  {item?.exam_id?.exam_type === "1" ? 'Questions' : 'পরিক্ষা দিন'}</Link>
  //     </td>
  //   </tr>
  // );

  const isQuiz = item?.exam_id?.exam_type === "0";

  return (
    <tr className="hover">
      <th>{item?.exam_id?.course_id?.title} </th>
      <td>{item?.exam_id?.title}</td>
      <td>{item?.exam_id?.fee}</td>
      <td>{item?.exam_id?.exam_type === "0" ? "Quiz" : "Questions"}</td>
      <td>{localData}</td>
      <td>{item?.trx_id}</td>
      <td>paid</td>
      <td>
        {isQuiz ? (
          <p>N/A</p>
        ) : (
          // <button onClick={() => document.getElementById('my_modal_3').showModal()} className="px-2 py-2 bg-green-600 text-white rounded-sm">See All Questions</button>
          <button
            onClick={() => setIsModalOpen1(true)}
            className="px-2 py-2 bg-green-600 text-white rounded-sm lg:w-[100px]"
          >
            See all questions
          </button>
        )}
      </td>
      <td>
        {isQuiz ? (
          <Link
            href={`/user/myexams/details/${item?.exam_id?.id}`}
            className="text-red-500 font-bold "
          >
            Start Now
          </Link>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-bluePrimary text-white py-2  lg:w-[150px] transition-all duration-300 rounded hover:bg-cyanPrimary z-0"
            disabled={pdfSubmitted}
          >
            {pdfSubmitted ? "Answer submitted" : "Submit answer"}
          </button>
        )}
      </td>
      <div>
        <dialog open={modalOpen} id={`my_modal_${examId}`} className="modal">
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmitPdf}>
              <h1 className="font-bold text-red-500">
                Be careful. You can only submit the answer once.
                <br />
                Make sure link is public
                {/* Before Submit, Please check pdf link is public, and carefully
                submit this */}
              </h1>
              <div>
                <label
                  htmlFor="answer link"
                  className="block text-sm font-medium text-gray-600 mt-4"
                >
                  Submit your pdf link:
                </label>
                <input
                  type="url"
                  id=""
                  name="answer"
                  placeholder="Submit your pdf link"
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white w-full py-2 px-4 rounded-md mt-4"
              >
                Submit your answer
              </button>
            </form>
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
        </dialog>
      </div>
      <div>
        <dialog
          open={isModalOpen}
          id={`my_modal_${examId}_questions`}
          className="modal"
        >
          <div className="modal-box">
            {/* {
              questionData?.map((item, index) => <UserSeeBroadQuestion key={item?.id} item={item} index={index} setIsModalOpen1={setIsModalOpen1}></UserSeeBroadQuestion>)
            } */}
            {questionData ? (
              questionData.map((item, index) => (
                <UserSeeBroadQuestion
                  key={item?.id}
                  item={item}
                  index={index}
                  setIsModalOpen1={setIsModalOpen1}
                />
              ))
            ) : (
              <p>There is no question available</p>
            )}
          </div>
        </dialog>
      </div>
    </tr>
  );
};

export default SinglePaymentDetails;
