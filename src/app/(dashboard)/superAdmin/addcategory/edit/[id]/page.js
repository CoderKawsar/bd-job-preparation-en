"use client";

import EditCategory from "@/components/dashboard/admin/EditCategory";
import axios from "axios";
import { useParams } from "next/navigation";

const EditCategoryPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <EditCategory id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default EditCategoryPage;
