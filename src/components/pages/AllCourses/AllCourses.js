"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Commonbanner from "@/components/banners/Commonbanner";
import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useState } from "react";

const AllCourses = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useGetAllCoursesQuery({
    limit,
    page,
  });

  const coursesData = data?.courses?.data;

  const totalData = data?.courses?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  let content = null;

  if (isLoading) {
    content = (
      <>
        <div> Loading...</div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <h5>There was an error</h5>;
  }

  if (!isLoading && !isError && coursesData?.length === 0) {
    content = (
      <>
        {" "}
        <p>There is no data</p>
      </>
    );
  }

  if (!isLoading && !isError && coursesData?.length > 0) {
    content = coursesData?.map((item) => (
      <CourseCard key={item?._id} item={item} />
    ));
  }
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: " সব কোর্স" },
  ];

  return (
    <>
      <Commonbanner title="Courses" breadcrumbItems={breadcrumbItems} />
      <div className="px-14 py-10">
        <div className="">
          <h2 className="text-2xl font-bold  rounded text-center py-10">
            All Courses
          </h2>
        </div>
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default AllCourses;
