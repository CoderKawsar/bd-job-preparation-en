"use client";
import Pagination from "@/app/(dashboard)/Pagination";
import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useEffect, useState } from "react";

const CategoryCourses = ({ id }) => {
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetSingleCategoryQuery(id);

  const { data, isError, isLoading, refetch } = useGetAllCoursesQuery({
    category_id: id,
    limit,
    page,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const coursesData = data?.courses?.data;
  const coursesMeta = data?.courses?.meta;

  const totalData = coursesMeta?.total;
  const totalPages = Math.ceil(totalData / limit);

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
    { label: "Home", link: "/" },
    { label: "Courses", link: "/courses" },
    { label: `${category?.title}` },
  ];

  return (
    <div>
      <Commonbanner title="Category" breadcrumbItems={breadcrumbItems} />

      <div className="mx-14 my-20">
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default CategoryCourses;
