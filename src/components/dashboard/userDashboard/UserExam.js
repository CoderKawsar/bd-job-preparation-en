"use client";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
import { useState } from "react";

const UserExam = ({ exam_id }) => {
  const { data, isLoading, isError } =
    useGetMyQuestionsEnrollHistoryQuery(exam_id);
  const [selectedOptions, setSelectedOptions] = useState({});
  const handleCheckboxChange = (questionId, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: { [option]: true },
    }));
  };
  // (data)
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

  if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((quiz, index) => (
      <div key={quiz.id} className="mb-6 p-4  rounded">
        <p className="text-lg font-bold">
          {index + 1}) {quiz.question}
        </p>
        {/* inside the question form */}
        <div>
          {["a", "b", "c", "d"].map((option) => (
            <div key={option} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  name={`answer_${index}`}
                  checked={selectedOptions[quiz._id]?.[option]}
                  onChange={() => handleCheckboxChange(quiz._id, option)}
                />
                <span>{quiz[option]}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  }

  return <div>{content}</div>;
};

export default UserExam;
