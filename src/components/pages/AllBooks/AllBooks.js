"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Commonbanner from "@/components/banners/Commonbanner";
import BookSectionCard from "@/components/ui/Home/course/BookSectionCard";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";
import { useState } from "react";

const AllBooks = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useGetAllBooksQuery({
    limit,
    page,
  });
  (data);

  const booksData = data?.books?.data;
  const totalData = data?.books?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  let content = null;

  if (isLoading) {
    content = (
      <>
        <div>লোডিং ...</div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <h5>There was an error</h5>;
  }

  if (!isLoading && !isError && booksData?.length === 0) {
    content = (
      <>
        {" "}
        <p>There is no data</p>
      </>
    );
  }

  if (!isLoading && !isError && booksData?.length > 0) {
    content = booksData?.map((item) => (
      <BookSectionCard key={item?._id} item={item} />
    ));
  } 

  const breadcrumbItems = [{ label: "হোম", link: "/" }, { label: "সকল বইসমূহ" }];
  return (
    <div>
      <Commonbanner title="সকল বইসমূহ" breadcrumbItems={breadcrumbItems} />
      <div className="px-14 py-10">
        <div className="">
          <h2 className="text-2xl font-bold  rounded text-center py-10">
            {" "}
            সকল বইসমূহ
          </h2>
        </div>
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>
        <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/>
      </div>
    </div> 
  );
};

export default AllBooks;
