"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetAllUserExamsQuery } from "@/redux/api/examsApi";
import AllExamDetails from "./AllExamDetails";
import Pagination from "@/app/(dashboard)/Pagination";
import { useEffect, useState } from "react";
import EmptyContent from "@/components/Loader/EmptyContent";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";

const AllUserExams = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch: refetchUserExam,
  } = useGetAllUserExamsQuery({ limit, page, searchTerm });

  const allExams = data?.exams?.data;

  useEffect(() => {
    refetchUserExam();
  }, [limit, page, searchTerm]);

  //check permission
  useEffect(() => {
    if (!checkPermission("exam")) {
      router.push("/");
    }
  }, []);

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

  if (!isLoading && !isError && allExams?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }
  if (!isLoading && !isError && allExams?.length > 0) {
    content = allExams?.map((item) => (
      <AllExamDetails key={item?.id} item={item} />
    ));
  }
  return (
    <div className="py-10">
      <h2 className="text-xl font-bold py-5"> All students Exams List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="py-2 px-2 border-b">Student Name</th>
              <th className="py-2 px-2 border-b">Course Title</th>
              <th className="py-2 px-2 border-b">Exam Title</th>
              <th className="py-2 px-2 border-b">Exam Time </th>
              <th className="py-2 px-2 border-b">Exam Type</th>
              <th className="py-2 px-2 border-b">Exam Fee</th>
              <th className="py-2 px-2 border-b">Total Marks</th>
              <th className="py-2 px-2 border-b">See Answer</th>
              <th className="py-2 px-2 border-b">Quiz Mark</th>
              <th className="py-2 px-2 border-b">Written Mark</th>
              <th className="py-2 px-2 border-b">Give Mark</th>
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

export default AllUserExams;
