"use client";

import Commonbanner from "@/components/banners/Commonbanner";
import Quiz from "@/components/ui/Home/Quiz";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

const quizData = [
  {
    id: "1",
    question: "ব্যকরণ শব্দের অর্থ কী?",
    options: [
      "বিশেষভাবে বিভাজন",
      "বিশেষভাবে বিয়োজন",
      "বিশেষভাবে বিশ্লেষণ",
      "বিশেষভাবে সংযোজন",
    ],
    correctAnswer: "বিশেষভাবে বিশ্লেষণ",
  },
  {
    id: "2",
    question: "Bag and baggage ' idiom - এর অর্থ কি?",
    options: [
      "Belongings",
      "Heavy things",
      "Costly things",
      "Leaving nothing behind",
    ],
    correctAnswer: "Leaving nothing behind",
  },
  {
    id: "3",
    question:
      "টাকায় ৩টি করে লেবু কিনে টাকায় ২টি করে বিক্রি করলে শতকরা কত লাভ হবে?",
    options: ["৫০%", "৩৩%", "৩০%", "৩১%"],
    correctAnswer: "৫০%",
  },
  {
    id: "4",
    question: "ঈসা খাঁর রাজধানী কোথায় অবস্থিত ?",
    options: ["গৌড়", "মহাস্থান গড়", "লক্ষনাবতী", "সোনারগাঁ"],
    correctAnswer: "সোনারগাঁ",
  },
  {
    id: "5",
    question: "কোনটি কম্পিউটারের সকল কার্যক্রম নিয়ন্ত্রণ করে?",
    options: [
      "কন্ট্রোল ইউনিট",
      "গাণিতিক ইউনিট",
      "সেন্ট্রাল প্রসেসিং ইউনিট",
      "যুক্তি বর্তনী ইউনিট",
    ],
    correctAnswer: "সেন্ট্রাল প্রসেসিং ইউনিট",
  },
  // Add more quiz data...
];

const calculateCorrectAnswers = (userAnswers) => {
  return quizData.reduce((count, question, index) => {
    return userAnswers[index] === question.correctAnswer ? count + 1 : count;
  }, 0);
};
const BasicQuizPage = () => {
  const { userId } = getUserInfo();
  const { data } = useGetSingleUserQuery(userId);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // const handleSubmit = (answers) => {
  //   setUserAnswers(answers);
  //   setShowResults(true);
  // };
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Basic Quiz" },
  ];

  const handleSubmit = (answers) => {
    setUserAnswers(answers);
    setShowResults(true);

    const correctAnswersCount = calculateCorrectAnswers(answers);
    const correctAnswersLength = quizData.length;

    let message = "";
    if (correctAnswersCount === correctAnswersLength) {
      message = `Excellent! Perfect Score! You answered all ${correctAnswersLength} questions correctly.`;
    } else if (correctAnswersCount >= 4) {
      message = `Good Job! You answered ${correctAnswersCount} out of ${correctAnswersLength} questions correctly.`;
    } else if (correctAnswersCount >= 3) {
      message = `Not Bad! You answered ${correctAnswersCount} out of ${correctAnswersLength} questions correctly. Keep improving!`;
    } else {
      message = `Please read more and try again! You answered only ${correctAnswersCount} out of ${correctAnswersLength} questions correctly.`;
    }

    Swal.fire({
      title: "Congratulations!!!",
      text: message,
      icon: "success",
    });
  };

  return (
    <>
      <Commonbanner title="Basic Quiz" breadcrumbItems={breadcrumbItems} />
      <div className=" px-14 text-center">
        <div className="py-16 bg-white rounded shadow-lg my-4">
          {/* <h2 className="text-2xl font-bold text-center text-yellowPrimary">Welcome {data?.name} </h2> */}
          {!showResults ? (
            <Quiz quizData={quizData} onSubmit={handleSubmit} />
          ) : (
            <div>
              <h2 className="text-2xl font-bold pb-5">
                {" "}
                Congratulation!!! Your Results{" "}
              </h2>
              <ul className="pb-10 text-start px-10 ">
                {quizData.map((question, index) => (
                  <li key={index} className="py-2 ">
                    {index + 1} . {question.question}
                    <span className="text-red-400">
                      - Your Answer: {userAnswers[index]},
                    </span>
                    {"   "}
                    <span className="text-green-600">
                      Correct Answer: {question.correctAnswer}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/"
                className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary "
              >
                Go Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasicQuizPage;
