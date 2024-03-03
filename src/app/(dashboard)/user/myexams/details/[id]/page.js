'use client'
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import QuizSubmissionResult from "@/components/dashboard/userDashboard/QuizSubmissionResult";
import { useGetSingleExamQuery } from "@/redux/api/examsApi";
import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
import { useExamResultQuery, useSubmitExamUserMutation } from "@/redux/api/resultApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserExamPage = ({ params }) => {
  const [quizMessage, setQuizMessage] = useState(null);
  const { id } = params;
  const { userId } = getUserInfo();
  const [submitExamUser] = useSubmitExamUserMutation()
  const { data, isLoading, isError } = useGetMyQuestionsEnrollHistoryQuery(id);
  const { data: exam, isLoading: loading, isError: error } = useGetSingleExamQuery(id);
  const { data: examResult } = useExamResultQuery({ exam_type: 0, exam_id: id, user_id: userId });
  const examTimeInMinutes = exam?.duration_in_minutes;
  // const [time, setTime] = useState(examTimeInMinutes ? examTimeInMinutes * 60 : 0);
  const [time, setTime] = useState(() => {
    const storedTime = localStorage.getItem(`examTime_${id}`);
    return storedTime ? parseInt(storedTime, 10) : examTimeInMinutes ? examTimeInMinutes * 60 : 0;
  });
  const [selectedOptions, setSelectedOptions] = useState({});

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const totalQuestions = Object.keys(selectedOptions).length;

  const handleCheckboxChange = (questionId, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      // [questionId]: { [option]: true },
      [questionId]: option,
    }));
    setSubmitButtonDisabled(false);
  };
  const handleSubmit = async () => {
    const totalCorrectAnswers = data?.reduce((total, quiz) => {
      const selectedOption = selectedOptions[quiz.id];
      const correctOption = quiz.correct_answer;

      setCorrectAnswers((prevCorrectAnswers) => ({
        ...prevCorrectAnswers,
        [quiz.id]: correctOption,
      }));

      if (selectedOption && selectedOption[correctOption]) {
        return total + 1;
      }

      return total;
    }, 0);
    const isTimeUp = time <= 0;

    // If time is up, automatically select remaining unanswered questions
    if (isTimeUp) {
      data?.forEach((quiz) => {
        if (!selectedOptions[quiz.id]) {
          handleCheckboxChange(quiz.id);
        }
      });
    }

    const totalWrongAnswers = totalQuestions - totalCorrectAnswers;
    const submissionData = {
      user_id: userId,
      exam_id: id,
      exam_type: "0",
      answer: JSON.stringify(data?.map((quiz) => {
        const selectedOption = selectedOptions[quiz.id];
        return {
          question: quiz?.question,
          correct_answer: quiz?.correct_answer,
          options: quiz?.options?.map((opt) => Object.values(opt)[0]),
          answer: selectedOption || "you don't give an answer",
          is_correct: correctAnswers[quiz.id] === selectedOption ? 1 : 0,
        };
      })),
      total_marks: totalQuestions,
      total_correct_answer: totalCorrectAnswers,
      total_wrong_answer: totalWrongAnswers,
      isApproved: true
    };
    // Make an API request to save the user's submission
    setSubmitButtonDisabled(true);
    try {
      const response = await submitExamUser(submissionData);
      // Assuming your backend returns some acknowledgment
      if (!!response) {
        const isStudentPass = totalCorrectAnswers / totalQuestions >= 0.7;
        const quizMessage = isStudentPass ? "Congratulations! You passed the quiz test" : "Sorry, you did not pass the quiz. Don't worry 💪💪. Next time you will be doing better ☺️☺️☺️☺️☺️! 🔥🔥Best of luck 🔥🔥";
        setQuizMessage(quizMessage);
        Swal.fire({
          title: `<p>${quizMessage}</p>`,
          html: `<p>Your have answered: ${totalQuestions}</p>
                 <p>Your Correct Answers: ${totalCorrectAnswers}</p>
                 <p>Your Wrong Answers: ${totalWrongAnswers}</p>`,
          icon: isStudentPass ? 'success' : 'error',
        });

        setQuizSubmitted(true);
      } else {
        // Handle the case when the submission fails
        Swal.fire({
          title: 'Submission Failed',
          text: 'There was an error submitting your quiz. Please try again.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Handle the case when the submission fails
      Swal.fire({
        title: 'Opps!!!! ',
        text: 'There was an error submitting your quiz. Please try again.',
        icon: 'error',
      });
    }
  };
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);


  useEffect(() => {
    if (examTimeInMinutes && time > 0 && !quizSubmitted) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (time === 0 && !hasAutoSubmitted && !quizSubmitted) {
      handleSubmit();
      setHasAutoSubmitted(true);
    }
  }, [examTimeInMinutes, time, handleSubmit, hasAutoSubmitted, quizSubmitted]);

  const isWarningTime = time <= 60;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    localStorage.setItem(`examTime_${id}`, time.toString());
  }, [time, id]);

  // (examResult?.exams?.data, "this isexamResult");
  let content = null;
  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }
  // (examResult?.exams?.data?.length, "examResult?.exams?.data?.length");

  if (!isLoading && !isError && data?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>You don't buy any exam right now</h5>
        </div>
      </>
    );
  }

  // if (!isLoading && !isError && data?.length > 0) {
  //   content = examResult?.exams?.data?.length ?
  //     <QuizSubmissionResult examResult={examResult} />

  //     :
  //     data?.map((quiz, i) => (
  //       <div key={quiz.id} className="mb-6 p-4  rounded">
  //         <p className="text-lg font-bold">
  //           Question {i + 1}: {quiz.question}
  //         </p>
  //         <div>
  //           {quiz?.options?.map((option, index) => (
  //             <div key={index} className="mb-2">
  //               <label className="flex items-center">
  //                 <input
  //                   type="radio"
  //                   className="mr-2 h-7 w-5"
  //                   name={`answer_${quiz.id}`}
  //                   // checked={selectedOptions[quiz.id]?.[option]}
  //                   checked={selectedOptions[quiz.id] === option}
  //                   onChange={() => handleCheckboxChange(quiz.id, option)}
  //                 />
  //                 {/* <span>{quiz?.options?.find((o) => o.hasOwnProperty(option))?.[option]}</span> */}
  //                 <span>{Object.values(option)[0]}</span>
  //               </label>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     ))

  // }
  if (!isLoading && !isError && data?.length > 0) {
    content = examResult?.exams?.data?.length ?
      <QuizSubmissionResult examResult={examResult} /> :
      <>
        <div className="flex justify-end">
          <p className={`text-xl font-bold px-2 rounded-sm  fixed ${isWarningTime ? 'bg-red-500' : 'bg-transparent'}`}>
            {examTimeInMinutes ? `End In: ${minutes} minutes: ${seconds} seconds left` : 'Exam duration not available'}
          </p>
        </div>
        {data?.map((quiz, i) => (
          <div key={quiz.id} className="mb-6 p-4  rounded">
            <p className="text-lg font-bold">
              Question {i + 1}: {quiz.question}
            </p>
            <div>
              {quiz?.options?.map((option, index) => (
                <div key={index} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="mr-2 h-7 w-5"
                      name={`answer_${quiz.id}`}
                      // checked={selectedOptions[quiz.id]?.[option]}
                      checked={selectedOptions[quiz.id] === option}
                      onChange={() => handleCheckboxChange(quiz.id, option)}
                    />
                    {/* <span>{quiz?.options?.find((o) => o.hasOwnProperty(option))?.[option]}</span> */}
                    <span>{Object.values(option)[0]}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          disabled={isSubmitButtonDisabled || time === 0}
          className={`py-2 px-4 rounded ${isSubmitButtonDisabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Submit
        </button>
      </>
  }


  return (
    <div>
      {/* <div className="flex justify-end">
        <p className={`text-xl font-bold px-2 rounded-sm  fixed ${isWarningTime ? 'bg-red-500' : 'bg-transparent'}`}>
          {examTimeInMinutes ? `End In: ${minutes} minutes: ${seconds} seconds left` : 'Exam duration not available'}
        </p>
      </div> */}
      {content}
      {/* <button
        onClick={handleSubmit}
        disabled={isSubmitButtonDisabled || time === 0}
        className={`py-2 px-4 rounded ${isSubmitButtonDisabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Submit
      </button> */}
      {/* {quizSubmitted && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Quiz Results</h2>
          <div className="mt-2">
            {data?.map((quiz, i) => (<>
              <p key={quiz.id} className="text-green-400">
                Question {i + 1}: Correct Answer - {correctAnswers[quiz?.id]}
              </p>
              <p className="text-red-400"> Your Answer - {selectedOptions[quiz?.id] && Object.keys(selectedOptions[quiz?.id])[0] ? selectedOptions[quiz?.id] && Object.keys(selectedOptions[quiz?.id])[0] : " you don't given answer"}</p>
            </>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserExamPage;