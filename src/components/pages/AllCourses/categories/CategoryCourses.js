"use client";
import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const CategoryCourses = ({ id }) => {
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetSingleCategoryQuery(id);
  const { data, isError, isLoading } = useGetAllCoursesQuery({
    category_id: id,
  });
  const coursesData = data?.courses?.data;

  console.log(coursesData, "course data");

  let content = null;

  if (isLoading || categoryLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && !categoryLoading && (isError || categoryError)) {
    content = <Error />;
  }

  if (!isLoading && !isError && !categoryError && coursesData?.length === 0) {
    content = (
      <>
        <EmptyContent content="Course" />
      </>
    );
  }

  if (
    !isLoading &&
    !categoryLoading &&
    !isError &&
    !categoryError &&
    coursesData?.length > 0
  ) {
    content = coursesData?.map((item) => (
      <CourseCard key={item?._id} item={item} />
    ));
  }

  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কোর্সসমূহ", link: "/courses" },
    { label: `${category?.title}` },
  ];

  return (
    <div>
      <Commonbanner title="ক্যাটাগরি" breadcrumbItems={breadcrumbItems} />

      <div className="mx-14 my-20">
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>
      </div>
    </div>
  );
};

export default CategoryCourses;
