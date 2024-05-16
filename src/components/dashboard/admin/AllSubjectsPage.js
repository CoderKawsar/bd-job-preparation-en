"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi";
import { useState } from "react";
import SingleSubjectOnDashBoard from "./SingleSubjectOnDashBoard";

const AllSubjectsPage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetAllSubjectsQuery({ limit, page });
  const allSubjects = data?.subjects;

  const totalData = data?.meta?.total;
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

  if (!isLoading && !isError && allSubjects?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>এখনো কোন বিষয় নাই</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && allSubjects?.length > 0) {
    content = allSubjects?.map((item) => (
      <SingleSubjectOnDashBoard key={item?.id} subject={item} />
    ));
  }

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="text-center font-bold text-3xl my-4 w-fit border-b-2 border-gray-300 pb-2">
          সাবজেক্টসমূহ
        </h2>
      </div>
      <div className="my-5 space-y-4">{content}</div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AllSubjectsPage;
