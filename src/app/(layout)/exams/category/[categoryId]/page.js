"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import ExamLists from "@/components/pages/AllCourses/ExamLists";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";
import { useGetExamsOfACategoryQuery } from "@/redux/api/examsApi";
import { useEffect } from "react";

function CategoryExams({ params }) {
  const { categoryId } = params;

  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetSingleCategoryQuery(categoryId);

  const {
    data: exams,
    isLoading: examsLoading,
    isError: examsError,
    refetch,
  } = useGetExamsOfACategoryQuery(categoryId);

  useEffect(() => {
    refetch();
  }, [categoryId]);

  let content = null;

  if (categoryLoading || examsLoading) {
    content = <InitialLoader />;
  }

  if (!categoryLoading && !examsLoading && (examsError || categoryError)) {
    content = <Error />;
  }

  if (!examsLoading && !examsError && exams?.length === 0) {
    content = (
      <h5 className="font-semibold text-center bg-green-600 text-white p-3 rounded text-md">
        {category?.title} No exam found
      </h5>
    );
  }

  if (!categoryLoading && !examsLoading && !examsError && exams?.length > 0) {
    content = <ExamLists exams={exams} />;
  }

  return (
    <div className="mx-4 md:mx-16 mb-16">
      <div className="flex justify-center mb-4">
        <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-6">
          {category?.title && `${category?.title} `}Exams:
        </h2>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default CategoryExams;
