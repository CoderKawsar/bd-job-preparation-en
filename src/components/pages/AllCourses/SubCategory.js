"use client";

import Loading from "@/app/loading";
import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetSingleSubCategoryQuery } from "@/redux/api/subcategoryApi";
import Link from "next/link";

const SubCategory = ({ id }) => {
  const { data, isError, isLoading } = useGetAllCoursesQuery({
    limit: 500,
    sub_category_id: id,
  });
  const coursesData = data?.courses?.data;

  const { data: subCategory } = useGetSingleSubCategoryQuery(id);

  // const filterCourseDta = coursesData?.filter(
  //   (item) => item?.sub_category_id?.id === id
  // );

  // (filterCourseDta)

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && coursesData?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && coursesData?.length > 0) {
    content = coursesData?.map((item) => (
      <CourseCard key={item?._id} item={item} />
    ));
  }
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কোর্সসমূহ", link: "/courses" },
    // { label: 'ক্যাটাগরি', link:'/courses/category' },
    {
      label: `${subCategory?.category_id?.title || ""} - ${
        subCategory?.title || ""
      }`,
    },
  ];

  return (
    <div>
      {!isLoading ? (
        <Commonbanner title="সাব ক্যাটাগরি" breadcrumbItems={breadcrumbItems} />
      ) : (
        <Loading />
      )}
      <div className="mx-14 my-20">
        <h2 className="text-center font-bold text-xl pb-10 text-yellowPrimary">
          {subCategory?.category_id?.title || ""} - {subCategory?.title || ""}
        </h2>
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>
        <div className="flex justify-end">
          <Link
            href={`/courses/category/subcategory/courseBundle/${id}`}
            className=" bg-bluePrimary text-white hover:bg-yellowPrimary    rounded transition-all duration-500 delay-200 font-bold text-xl border px-10 py-3 lg:mb-0 mb-5"
          >
            সব কোর্স একসাথে কিনুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
