"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import ExamLists from "@/components/pages/AllCourses/ExamLists";
import { useGetExamsOfASubCategoryQuery } from "@/redux/api/examsApi";
import { useGetSingleSubCategoryQuery } from "@/redux/api/subcategoryApi";
import { useEffect } from "react";

function SubCategoryExams({ params }) {
  const { subcategoryId } = params;

  const {
    data: subCategory,
    isLoading: subCatLoading,
    isError: subCatError,
  } = useGetSingleSubCategoryQuery(subcategoryId);

  const {
    data: exams,
    isLoading: examsLoading,
    isError: examsError,
    refetch,
  } = useGetExamsOfASubCategoryQuery(subcategoryId);

  useEffect(() => {
    refetch();
  }, [subcategoryId]);

  let content = null;

  if (subCatLoading || examsLoading) {
    content = <InitialLoader />;
  }

  if (!subCatLoading && !examsLoading && (examsError || subCatError)) {
    content = <Error />;
  }

  if (!examsLoading && !examsError && exams?.length === 0) {
    content = (
      <h5 className="font-semibold text-center bg-green-600 text-white p-3 rounded text-md">
        {subCategory?.category_id?.title} - {subCategory?.title} এর আপাতত কোনো
        পরীক্ষা নেই
      </h5>
    );
  }

  if (!subCatLoading && !examsLoading && !examsError && exams?.length > 0) {
    content = <ExamLists exams={exams} />;
  }

  return (
    <div className="mx-4 md:mx-16 mb-16">
      <div className="flex justify-center mb-4">
        <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-6">
          {subCategory?.category_id?.title} - {subCategory?.title} এর
          পরীক্ষাসমুহঃ
        </h2>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default SubCategoryExams;
