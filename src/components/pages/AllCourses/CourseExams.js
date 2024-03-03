import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import PaymentModal from "@/components/shared/PaymentModal";
import { authKey } from "@/constants/storage";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CourseExams({ course_id }) {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();


  // states
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const {
    data: dataExams,
    isError,
    isLoading,
  } = useGetAllExamsQuery({
    course_id: course_id,
  });

  // effects
  useEffect(() => {
    if (paymentMethod) {
      enrollToExam(selectedExam);
    }
  }, [paymentMethod]);

  const enrollToExam = async (exam) => {
    if (!userLoggedIn) {
      return toast.error("Please sign in to buy the exam");
    }

    const examPaymentPayload = {
      user_id: getUserInfo()?.userId,
      exam_id: exam?.id,
    };

    Cookies.set("order_type", "exam");
    Cookies.set("creationPayload", JSON.stringify(examPaymentPayload));


    if (paymentMethod === "bkash") {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
        {
          amount: `${exam?.fee}`,
        },
        {
          withCredentials: true,
          headers: { Authorization: getFromLocalStorage(authKey) },
        }
      );
      router.push(data?.data);
    } else if (paymentMethod === "nagad") {
      const { data: payment } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nagad/payment/create`,
        {
          amount: `${exam?.fee}`,
        }
      );
      router.push(payment?.data);
    }
  };

  const examsData = dataExams?.exams?.data;

  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && examsData?.length === 0) {
    content = (
      <h5 className="font-semibold bg-green-600 text-white p-3 rounded text-md">
        এই কোর্সে এখনও কোনো পরীক্ষা নেই।
      </h5>
    );
  }

  if (!isLoading && !isError && examsData?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table table-auto min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-[16px]">
              <th className="py-2 px-4 md:w-1/4">পরীক্ষার শিরোনাম</th>
              <th className="py-2 px-4 md:w-1/4">পরীক্ষার ধরণ</th>
              <th className="py-2 px-4 md:w-1/4">মোট নাম্বার  </th>
              <th className="py-2 px-4 md:w-1/4">ফি</th>
              <th className="py-2 px-4 md:w-1/4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {examsData?.map((exam) => (
              <tr key={exam?._id}>
                <td className="py-2 px-4 md:w-1/4">{exam?.title}</td>
                <td className="py-2 px-4 md:w-1/4">
                  {exam?.exam_type == "0" ? "MCQ" : "Written"}
                </td>
                <td className="py-2 px-4 md:w-1/4">{exam?.total_marks}</td>
                <td className="py-2 px-4 md:w-1/4">{exam?.fee} {" "}টাকা</td>
                <td className="">
                  <button
                    onClick={() => {
                      setSelectedExam(exam);
                      setModalOpen(true);
                    }}
                    className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0 cursor-pointer lg:w-[100px]"
                  >
                    {exam?.exam_type === 0 ? 'কুইজ কিনুন' : 'প্রশ্ন কিনুন'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      {content}{" "}
      {modalOpen && (
        <PaymentModal
          setModalOpen={setModalOpen}
          setPaymentMethod={setPaymentMethod}
          amount={selectedExam?.fee}
        />
      )}
    </>
  );
}

export default CourseExams;
