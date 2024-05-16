"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import {
  useDeleteExamMutation,
  useGetAllExamsQuery,
  useUpdateStatusChangeMutation,
} from "@/redux/api/examsApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ExamApprovedByAdmin from "./ExamApprovedByAdmin";
import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";

const GetAllExams = () => {
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // const { data: questions, isLoading: isFilteredQuestionLoading } = useGetAllQuestionsQuery({ exam_type: 0 });
  // const allQuiz = questions?.categories?.data;
  const { data, isLoading, isError, refetch } = useGetAllExamsQuery({
    limit,
    page,
    searchTerm,
  });

  //   (data?.exams?.data);
  const examsData = data?.exams?.data;

  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);

  const totalData = data?.exams?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

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

  if (!isLoading && !isError && examsData?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && examsData?.length > 0) {
    content = examsData?.map((item, i) => (
      <ExamApprovedByAdmin item={item} i={i} />
    ));
  }

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold py-5">All Exams are here</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Course Name</th>
              <th className="py-2 px-4 border-b">Minutes</th>
              <th className="py-2 px-4 border-b">Exam Type</th>
              <th className="py-2 px-4 border-b">Fee</th>
              <th className="py-2 px-4 border-b">Total Exam Marks</th>
              <th className="py-2 px-4 border-b">
                Total Add This Question Mark
              </th>
              <th className="py-2 px-4 border-b">IsActive</th>
              <th className="py-2 px-4 border-b">Approved Exam</th>
              <th className="py-2 px-4 border-b">Update</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default GetAllExams;
