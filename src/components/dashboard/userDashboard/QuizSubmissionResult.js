
const QuizSubmissionResult = ({ examResult }) => {
    const getAllQuestion = examResult?.exams?.data;
    const mappedData = getAllQuestion?.map(item => ({
        answer: JSON.parse(item?.answer),
        correct_answer: item?.correct_answer,
        total_correct_answer: item?.total_correct_answer,
        total_marks: item?.total_marks

    }));
    const totalCorrectAnswers = mappedData.reduce((acc, item) => acc + item.total_correct_answer, 0);
    const totalMarks = mappedData.reduce((acc, item) => acc + item.total_marks, 0);
    const percentage = (totalCorrectAnswers / totalMarks) * 100;
    const resultStatus = percentage >= 70 ? "Pass" : "Fail";
    const resultBgColor = percentage >= 70 ? "bg-green-500" : "bg-red-500 text-white";

    return (
        <div>
            {mappedData?.map((item, index) => (
                <div key={index} className="my-4 p-4 bg-gray-100 rounded-lg">
                    <p > <span className="text-xl font-semibold mt-2">You Got Mark :  {item.total_correct_answer}</span>  <span className={`  p-1 space-x-2 rounded-lg ${resultBgColor}`}>{resultStatus}</span></p>
                    {item?.answer?.map((answer, answerIndex) => (
                        <div key={answerIndex} className="mb-4">
                            <div className="font-bold">{`Question ${answerIndex + 1}: ${answer?.question}`}</div>
                            <span>Right Ans: {answer?.correct_answer}</span>
                            <ul className="grid grid-cols-1 gap-4">
                                {answer?.options?.map((option, optionIndex) => {
                                    const isChecked = Object.values(answer?.answer).includes(option);
                                    const isCorrectAnswer = answer.correct_answer === option;
                                    return (
                                        <li key={optionIndex}>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    className={` ${isCorrectAnswer ? 'text-green-500' : 'text-red-500'}`}
                                                    name={`question${answerIndex}`}
                                                    value={option}
                                                    checked={isChecked}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>

    );
};

export default QuizSubmissionResult;
