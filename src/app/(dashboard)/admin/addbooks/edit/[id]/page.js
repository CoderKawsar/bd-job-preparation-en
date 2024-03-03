"use client";

import EditBook from "@/components/dashboard/admin/EditBook";
// import axios from "axios";
import { useParams } from "next/navigation";

const BookEditPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <EditBook id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default BookEditPage;
