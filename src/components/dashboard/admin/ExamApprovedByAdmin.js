import { useDeleteExamMutation, useUpdateStatusChangeMutation } from "@/redux/api/examsApi";
import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ExamApprovedByAdmin = ({ item, i }) => {

    const [deleteExam] = useDeleteExamMutation();
    const examId = item?.id;
    const activeStatus = item?.is_active;
    const totalQuestionMark = item?.total_marks;
    const [updateStatusChange] = useUpdateStatusChangeMutation()
    const { data: questions, isLoading: isFilteredQuestionLoading } = useGetAllQuestionsQuery({ exam_id: examId });
    const allQuestion = questions?.categories?.data;

    let totalMark = 0;
    if (allQuestion && allQuestion.length > 0) {

        allQuestion.forEach(question => {
            totalMark += question.mark;
        });
    } else {
        console.error("No questions found.");
    }

    // const handleStatusChange = async () => {
    //     try {
    //         const result = await updateStatusChange({
    //             id: examId,
    //             is_active: !activeStatus
    //         })
    //         if (result) {
    //             toast.success("Successfully change the status")
    //         }
    //     } catch (error) {
    //         console.error("Error Updating status", error)

    //     }
    // }
    const handleStatusChange = async () => {
        try {
            if (totalMark !== totalQuestionMark) {
                toast.error("Please add more questions to match the total marks.");
                return;
            }
            const result = await updateStatusChange({
                id: examId,
                is_active: !activeStatus
            });
            if (result) {
                toast.success("Successfully changed the status.");
            }
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "আপনি এই পরীক্ষাটি মুছে ফেলার বিষয়ে নিশ্চিত?",
                text: "আপনি যদি এটি মুছতে চান তবে 'হ্যাঁ মুছুন' বোতামে ক্লিক করুন অন্যথায় 'বাতিল' বোতামে ক্লিক করুন।",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "হ্যাঁ মুছুন",
                cancelButtonText: "বাতিল",
            });

            if (result.isConfirmed) {
                // User confirmed deletion
                const res = await deleteExam(id);
                // (res?.data)

                if (res?.data?._id === id) {
                    // Item deleted successfully
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                } else {
                    // Something went wrong with deletion
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong with deletion.",
                        icon: "error"
                    });

                }
            }
        } catch (err) {
            // Handle any errors that occur during the process
            toast.error(err.message);
        }
    };
    return (
        <tr key={item?._id} className="block md:table-row">
            <td className="py-2  px-1 border-b md:table-cell flex">
                <span className="text-bluePrimary">{i + 1}</span> {item?.title}
            </td>
            <td className="py-2 px-4 border-b md:table-cell">
                {item?.course_id?.title}
            </td>
            <td className="py-2 px-4 border-b md:table-cell">
                {item?.duration_in_minutes}
            </td>
            <td className="py-2 px-4 border-b md:table-cell">
                {item?.exam_type === "0" ? (
                    <span className="text-bluePrimary">Quiz</span>
                ) : (
                    <span className="text-yellowPrimary">Questions</span>
                )}
            </td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.fee}</td>
            <td className="py-2 px-4 border-b md:table-cell text-center">
                {totalQuestionMark}
            </td>
            <td className="py-2 px-4 border-b md:table-cell text-center">
                {totalMark}
            </td>

            <td className="py-2 px-4 border-b md:table-cell">{item?.is_active.toString()}</td>
            {/* <td className="py-2 px-4 border-b text-center md:table-cell"><button onClick={() => handleStatusChange(item?._id)} className="bg-green-500 text-white py-1 px-2 rounded-md">Approved Exam</button></td> */}
            <td className="py-2 px-4 border-b text-center md:table-cell">
                <button
                    onClick={handleStatusChange}
                    className={`bg-${activeStatus ? 'green' : 'red'}-500 text-white py-1 px-2 rounded-md`}

                >
                    {activeStatus ? 'Approved Exam' : 'Pending Approval'}
                </button>
            </td>

            <td className="py-2 px-4 border-b md:table-cell">
                <Link href={`/admin/addexams/edit/${item?._id}`}>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md">
                        Update
                    </button>
                </Link>
            </td>
            <td className="py-2 px-4 border-b md:table-cell">
                <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={() => handleDelete(item?._id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ExamApprovedByAdmin;