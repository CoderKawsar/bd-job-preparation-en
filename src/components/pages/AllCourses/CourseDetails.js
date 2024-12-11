"use client";
import Commonbanner from "@/components/banners/Commonbanner";
import CourseDetailsData from "./CourseDetailsData";
import { useGetSingleCourseQuery } from "@/redux/api/courseApi";

const CourseDetails = ({ id }) => {
  const { data, isLoading, isError } = useGetSingleCourseQuery(id);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: " Courses ", link: "/courses" },
    { label: " Course Details " },
  ];
  return (
    <div>
      <Commonbanner title="Course Details" breadcrumbItems={breadcrumbItems} />
      <CourseDetailsData data={data} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default CourseDetails;
