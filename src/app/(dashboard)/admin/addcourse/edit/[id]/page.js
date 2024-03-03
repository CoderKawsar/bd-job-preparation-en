"use client";

import EditCourse from "@/components/dashboard/admin/EditCourse";
// import axios from "axios";
import { useParams } from "next/navigation";

const EditCoursePage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <EditCourse id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default EditCoursePage;
