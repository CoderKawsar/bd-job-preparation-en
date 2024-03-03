"use client";

import EditSubCategory from "@/components/dashboard/admin/EditSubCategory";
import axios from "axios";
import { useParams } from "next/navigation";

const EditSubCategoryPage = ({ params }) => {
  // const params = useParams();
  const { id } = params;
  return (
    <div>
      <EditSubCategory id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/sub-categories`
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default EditSubCategoryPage;
