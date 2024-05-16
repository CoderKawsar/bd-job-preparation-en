"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Loading from "@/app/loading";
import BooksForPagination from "@/components/shared/BooksForPagination";
import { useGetCategoryBooksQuery } from "@/redux/api/booksApi";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";
import { useEffect, useState } from "react";

function CategoryBooksShow({ params }) {
  const { category_id } = params;

  const [page, setPage] = useState(1);
  const limit = 9;

  const {
    data: category,
    isLoading,
    isError,
  } = useGetSingleCategoryQuery(category_id);

  const {
    data,
    isLoading: booksLoading,
    isError: booksError,
    refetch: refetchBooks,
  } = useGetCategoryBooksQuery({
    category_id: category_id,
    args: { limit: limit, page: page },
  });

  const totalData = data?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  useEffect(() => {
    refetchBooks();
  }, [page]);

  let content;

  if (isLoading || booksLoading) content = <Loading />;

  if (!isLoading && !booksLoading && !data?.books?.length > 0)
    content = (
      <p className="m-4 p-4 text-center border font-semibold text-xl">
        No books found
      </p>
    );

  if (!isLoading && isError)
    content = <p className="text-red-400 p-4">There is an error!</p>;

  if (!isLoading && category && !booksLoading && data?.books?.length > 0)
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
    <div>
      <div className="flex justify-center">
        <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-6">
          {isLoading ? <Loading /> : category?.title}
        </h2>
      </div>
      {content}
    </div>
  );
}

export default CategoryBooksShow;
