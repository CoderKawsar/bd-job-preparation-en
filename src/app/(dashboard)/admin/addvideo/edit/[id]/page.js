"use client";

import EditCoursePlylist from "@/components/dashboard/admin/EditCoursePlaylist";
// import axios from "axios";
import { useParams } from "next/navigation";

const EditCoursePlaylistPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <EditCoursePlylist id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/course-playlists`,
//     {
//       headers: {
//         Authorization: process.env.SUPER_ADMIN_TOKEN,
//       },
//     }
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default EditCoursePlaylistPage;
