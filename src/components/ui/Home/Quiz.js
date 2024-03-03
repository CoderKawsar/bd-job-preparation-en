'use client'
import { useState } from 'react';

const Quiz = ({ quizData, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null));
  const [clickedOption, setClickedOption] = useState(null);
  const handleOptionClick = (option) => {
    setClickedOption(option);
    handleOptionSelect(option);
  };

  const handleOptionSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };
  const isNextButtonDisabled = () => {
    return clickedOption === null;
  };

  // const handleNextButtonClick = () => {
  //   if (isNextButtonDisabled()) {
  //     return alert('Please select one option before proceeding.');
  //   } else {
  //     setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  //   }
  // };

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const isLastQuestion = currentQuestion === quizData.length - 1;

  return (
    <div className='space-y-7 text-center'>
      <h2 className="text-xl font-bold pt-5">Question {currentQuestion + 1}</h2>
      <p className='text-lg'>{quizData[currentQuestion].question}</p>
      <div className='grid lg:grid-cols-4 gap-4 px-4 '>
      {quizData[currentQuestion].options.map((option, index) => (
        <label
          key={index}
          className={`border py-4 rounded cursor-pointer ${
            clickedOption === option ? 'shadow-lg text-white bg-bluePrimary' : 'hover:shadow-lg hover:text-white hover:bg-bluePrimary'
          }`}
          onClick={() => handleOptionClick(option)}
        >
          <input
            type="radio"
            required
            name={`question${currentQuestion}`}
            value={option}
            checked={userAnswers[currentQuestion] === option}
            onChange={() => handleOptionSelect(option)}
            className='mr-2'
          />
          {option}
        </label>
      ))}
      </div>
      <div>
        {currentQuestion > 0 && <button className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary mr-5 cursor-pointer"  onClick={handlePrevious}>Previous</button>}
        {isLastQuestion ? (
          <button onClick={() => onSubmit(userAnswers)} className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-bluePrimary cursor-pointer" >Submit</button>
        ) : (
          <button onClick={handleNext}  disabled={isNextButtonDisabled()}  className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary cursor-pointer" >Next</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
