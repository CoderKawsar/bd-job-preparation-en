"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Loading from "@/app/loading";
import BooksForPagination from "@/components/shared/BooksForPagination";
import { useGetBooksOfAProstutiQuery } from "@/redux/api/booksApi";
import { useEffect, useState } from "react";

function ProstutiBooksShow({ params }) {
  const { title } = params;

  const [page, setPage] = useState(1);
  const limit = 2;

  const {
    data,
    isLoading: booksLoading,
    isError: booksError,
    refetch: refetchBooks,
  } = useGetBooksOfAProstutiQuery({
    prostuti_title: title,
    args: { limit, page: page },
  });
  const totalData = data?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  useEffect(() => {
    refetchBooks();
  }, [page]);

  let content;

  if (booksLoading) content = <Loading />;

  if (!booksLoading && !data?.books?.length > 0)
    content = (
      <p className="m-4 p-4 text-center border font-semibold text-xl">
        No books found
      </p>
    );

  if (!booksLoading && booksError)
    content = <p className="text-red-400 p-4">There is an error!</p>;

  if (!booksLoading && data?.books?.length > 0)
    content = (
      <div>
        {!booksLoading && !booksError && data?.books?.length > 0 && (
          <BooksForPagination books={data?.books} />
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    );

  return (
    <div className="mb-16">
      <div className="flex justify-center">
        <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-12">
          {decodeURIComponent(title)} Preparation Books
        </h2>
      </div>
      {content}
    </div>
  );
}

export default ProstutiBooksShow;
