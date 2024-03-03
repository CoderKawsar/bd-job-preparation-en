"use client";

import EditExam from "@/components/dashboard/admin/EditExam";
// import axios from "axios";
import { useParams } from "next/navigation";

const ExamEditPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <EditExam id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/exams`
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default ExamEditPage;
