"use client";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import PaymentModal from "@/components/shared/PaymentModal";
import { authKey } from "@/constants/storage";
import {
  useGetAllExamsQuery,
  useGetMyDueExamsQuery,
} from "@/redux/api/examsApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CourseAllExams = ({ course_id }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const {
    data: dataExams,
    isLoading,
    isError,
  } = useGetAllExamsQuery({
    course_id: course_id,
  });
  const { data: dueExamIds } = useGetMyDueExamsQuery();

  // states
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // effects
  useEffect(() => {
    if (paymentMethod) {
      enrollToExam(selectedExam);
    }
  }, [paymentMethod]);

  const enrollToExam = async (exam) => {
    if (!userLoggedIn) {
      return toast.error("Please signin to buy exam");
    }
    if (dueExamIds && dueExamIds?.length) {
      const isExamDue = dueExamIds.find((dueExamId) => dueExamId === exam?.id);
      if (isExamDue) {
        toast(
          "You have already paid for this exam. Please go to your dashboard to take the exam."
        );
        return;
      }
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
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error></Error>;
  }
  if (!isLoading && !isError && examsData?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg mt-5">
          <h5>No quiz/exam found on this course</h5>
        </div>
      </>
    );
  }
  if (!isLoading && !isError && examsData?.length > 0) {
    content = examsData?.map((exam) => (
      <tr className="hover " key={exam?._id}>
        <th className="text-gray-400">#</th>
        <td>{exam?.title}</td>
        <td>{exam?.exam_type == "0" ? "MCQ" : "Written"}</td>
        <td>{exam?.total_marks}</td>
        <td>{exam?.fee}</td>
        <td>
          <p
            onClick={() => {
              setSelectedExam(exam);
              setModalOpen(true);
            }}
            className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0  cursor-pointer w-fit"
          >
            Attend Exam
          </p>
        </td>
      </tr>
    ));
  }
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "All Courses", link: "/courses" },
    { label: "Exam/ Quiz" },
  ];

  return (
    <>
      <Commonbanner title="Exam/ Quiz" breadcrumbItems={breadcrumbItems} />
      <div className="mx-20 py-20 ">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-[16px]">
                <th>Exam Title</th>
                <th>Exam Type</th>
                <th>Total Marks</th>
                <th>Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {content}
              {/* {!!examsData &&
            examsData?.map((exam) => (
              <tr className="hover" key={exam?._id}>
                <th className="text-gray-400">#</th>
                <td>{exam?.title}</td>
                <td>{exam?.exam_type == "0" ? "MCQ" : "Written"}</td>
                <td>{exam?.total_marks}</td>
                <td>{exam?.fee}</td>
                <td>
                  <p
                    onClick={() => enrollToExam(exam)}
                    className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0  cursor-pointer w-fit"
                  >
                    Enroll
                  </p>
                </td>
              </tr>
            ))} */}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && (
        <PaymentModal
          setModalOpen={setModalOpen}
          setPaymentMethod={setPaymentMethod}
          amount={selectedExam?.fee}
        />
      )}
    </>
  );
};

export default CourseAllExams;
