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

  const { data, isLoading, isError, refetch: refetchUserExam } = useGetAllUserExamsQuery({ limit, page, searchTerm });

  const allExams = data?.exams?.data;


  useEffect(() => {
    refetchUserExam();
  }, [limit, page, searchTerm]);

  //check permission
  useEffect(()=>{
    if(!checkPermission('exam')){

     router.push('/')
    }

  },[])


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
    content = allExams?.map((item) => <AllExamDetails key={item?.id} item={item} />)
  }
  return (
    <div className="py-10">
      <h2 className="text-xl font-bold py-5"> All students Exams List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="py-2 px-2 border-b">ছাত্রী/ছাত্রের নাম</th>
              <th className="py-2 px-2 border-b">কোর্সের নাম</th>
              <th className="py-2 px-2 border-b">পরিক্ষার নাম</th>
              <th className="py-2 px-2 border-b"> পরিক্ষার সময় </th>
              <th className="py-2 px-2 border-b">পরিক্ষার ধরন</th>
              <th className="py-2 px-2 border-b">পরিক্ষার ফী</th>
              <th className="py-2 px-2 border-b">টোটাল মার্ক্স</th>
              <th className="py-2 px-2 border-b">উত্তর দেখুন</th>
              <th className="py-2 px-2 border-b">ক্যুইজ মার্ক্স</th>
              <th className="py-2 px-2 border-b">লিখিত মার্ক্স</th>
              <th className="py-2 px-2 border-b">নম্বর দিন</th>


            </tr>
          </thead>
          <tbody>
            {content}

          </tbody>
        </table>

        <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />

      </div>
    </div>
  );
};

export default AllUserExams;
