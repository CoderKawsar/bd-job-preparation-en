import InitialLoader from "@/components/Loader/InitialLoader";
import PaymentModal from "@/components/shared/PaymentModal";
import { authKey } from "@/constants/storage";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ExamLists({ exams }) {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  // states
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  console.log("paymentMethod", paymentMethod);

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
      exam_id: exam?._id,
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
    } else if (paymentMethod === "stripe") {
      const { data: payment } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/payment/create`,
        {
          amount: exam?.fee,
          exam_id: exam?._id,
        },
        {
          headers: {
            Authorization: getFromLocalStorage(authKey),
          },
        }
      );
      router.push(payment?.url);
    }
  };

  let content = null;

  if (exams?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="table table-auto min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-[16px]">
              <th className="py-2 px-1 md:px-4">পরীক্ষার শিরোনাম</th>
              <th className="py-2 px-1 md:px-4">পরীক্ষার ধরণ</th>
              <th className="py-2 px-1 md:px-4">মোট নাম্বার</th>
              <th className="py-2 px-1 md:px-4">ফি</th>
              <th className="py-2 px-1 md:px-4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {exams?.map((exam) => (
              <tr key={exam?._id}>
                <td className="py-2 px-1 md:px-4">{exam?.title}</td>
                <td className="py-2 px-1 md:px-4">
                  {exam?.exam_type === "0" ? "MCQ" : "Written"}
                </td>
                <td className="py-2 px-1 md:px-4">{exam?.total_marks}</td>
                <td className="py-2 px-1 md:px-4">{exam?.fee} টাকা</td>
                <td className="py-2 px-1 md:px-4">
                  <button
                    onClick={() => {
                      setSelectedExam(exam);
                      setModalOpen(true);
                    }}
                    className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0 cursor-pointer lg:w-[100px]"
                  >
                    পরিক্ষা দিন
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

export default ExamLists;
