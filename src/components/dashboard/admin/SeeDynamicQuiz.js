
const SeeDynamicQuiz = ({ setOpenModal, filteredQuestions, examTitle }) => {
    const specificQuiz = filteredQuestions.filter(q => q?.exam_id?.title === examTitle);

    return (
        <div className="modal-box">
            <h1 className="text-xl font-semibold">{examTitle}</h1>
            <thead>
                <tr>
                    <th className="py-2 border-b">Question</th>
                    <th className="py-2 border-b">Option</th>
                    <th className="py-2 border-b">Correct Answer</th>
                </tr>
            </thead>

            {specificQuiz.map((filteredQuiz, index) => (
                <tr key={index}>

                    <td className="py-2 px-4 border-b">
                        {index + 1}) {filteredQuiz?.question}
                    </td>
                    <td className="py-2 px-4 border-b">
                        {filteredQuiz?.options?.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                {Object.keys(option)[0]}: {Object.values(option)[0]}
                            </div>
                        ))}
                    </td>
                    <td className="py-2 px-4 border-b">{filteredQuiz?.correct_answer}</td>
                </tr>
            ))}
            <button onClick={() => { setOpenModal(false) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
    );
};

export default SeeDynamicQuiz;