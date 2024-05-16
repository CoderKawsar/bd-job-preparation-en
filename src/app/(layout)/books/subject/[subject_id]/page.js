"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Loading from "@/app/loading";
import BooksForPagination from "@/components/shared/BooksForPagination";
import { useGetBooksOfASubjectQuery } from "@/redux/api/booksApi";
import { useGetSingleSubjectQuery } from "@/redux/api/subjectApi";
import { useEffect, useState } from "react";

function SubjectBooksShow({ params }) {
  const { subject_id } = params;

  const [page, setPage] = useState(1);
  const limit = 9;

  const {
    data: subject,
    isLoading: isSubjectLoading,
    isError: isSubjectError,
  } = useGetSingleSubjectQuery(subject_id);

  const {
    data,
    isLoading,
    isError,
    refetch: refetchBooks,
  } = useGetBooksOfASubjectQuery({ subject_id, args: { page, limit: 9 } });

  const totalData = data?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  useEffect(() => {
    refetchBooks();
  }, [page]);

  const subjectTitle =
    !isSubjectLoading && !isSubjectError && subject?.title
      ? `${subject?.title} বিষয়ের বইসমুহ`
      : "সাবজেক্টটি নেই";

  let content;

  if (isSubjectLoading || isLoading) content = <Loading />;

  if (!isLoading && (!data?.books || !data?.books?.length > 0))
    content = (
      <p className=" m-4 p-4 text-center border font-semibold text-xl">
        No books found
      </p>
    );

  if (!isLoading && isError)
    content = <p className="text-red-400 p-4">There is an error!</p>;

  if (!isLoading && data?.books?.length > 0)
    content = (
      <div>
        <BooksForPagination books={data?.books} />
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    );

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-6">
          {subjectTitle}
        </h2>
      </div>
      {content}
    </div>
  );
}

export default SubjectBooksShow;
