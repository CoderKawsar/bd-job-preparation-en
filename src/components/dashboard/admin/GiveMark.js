import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import { useGiveMarkToStudentMutation } from "@/redux/api/resultApi";
import { useState } from "react";
import toast from "react-hot-toast";

const GiveMark = ({ examResultData, refetchExamResult, examId, setModalOpen, studentId }) => {
    const [giveMarkToStudent] = useGiveMarkToStudentMutation();
    const { data: questions } = useGetAllQuestionsQuery({ exam_id: examId });
    const allQuestions = questions?.categories?.data;
    const [marks, setMarks] = useState({});

    const handleGiveMark = async (e) => {
        e.preventDefault();

        try {
            const questionMarksArray = Object.entries(marks).map(([questionId, mark]) => ({
                question_id: questionId,
                mark_obtained: Number(mark),
            }));

            // Validate that all questions have marks
            if (questionMarksArray.some(item => item.mark_obtained === undefined || item.mark_obtained === '')) {
                toast.error("Please provide marks for all questions");
                return;
            }

            const payload = {
                user_id: studentId,
                exam_id: examId,
                marks: questionMarksArray,
            };
            const { data: submissionData } = await giveMarkToStudent(payload);
            (submissionData, 'submissionData');

            if (submissionData) {
                toast.success("Congratulations! You have successfully submitted marks");
            } else {
                toast.error("Your submission was not successful");
            }
            refetchExamResult()

            ('Submission successful:', submissionData);
        } catch (error) {
            console.error('Error submitting marks:', error);
        }
    };

    const handleMarkChange = (questionId, value) => {
        setMarks(prevState => ({
            ...prevState,
            [questionId]: value,
        }));
    };

    return (
        <div className="modal-box">
            <form method="dialog" onSubmit={handleGiveMark}>
                <h1 className='font-bold text-red-500'>Admin Give Mark</h1>
                <h1>Also You can see ans Here --- <a className="font-bold text-red-500" href={examResultData?.answer} target="blank"> See Ans </a></h1>
                {allQuestions?.length &&
                    allQuestions?.map(question => (
                        <div key={question.id}>
                            <h1>Give mark to --- <span className="font-bold">{question?.question}</span></h1>
                            <label
                                htmlFor={`answer_${question.id}`}
                                className="block text-sm font-medium text-gray-600 mt-2 mb-2"
                            >
                                Give Mark:  <span className="font-bold">(Total Mark {question?.mark})</span>
                            </label>
                            <input
                                type="number"
                                max={question?.mark}
                                min={0}
                                id={`answer_${question.id}`}
                                name={`answer_${question.id}`}
                                className="mt-1 p-2 border rounded-md w-full"
                                onChange={(e) => handleMarkChange(question.id, e.target.value)}
                            />
                        </div>
                    ))
                }

                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 px-4 rounded-md mt-4"
                >
                    Give Marks
                </button>
            </form>
            <button onClick={() => { setModalOpen(false) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
    );
};

export default GiveMark;
