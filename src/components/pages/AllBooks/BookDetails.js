"use client";
import Commonbanner from "@/components/banners/Commonbanner";

import { useGetSingleBookQuery } from "@/redux/api/booksApi";
import BookDetailsData from "./BookDetailsData";

const BookDetails = ({ id }) => {
  const { data, isLoading, isError } = useGetSingleBookQuery(id);
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: " Books ", link: "/books" },
    { label: " Book Details " },
  ];

  return (
    <div>
      <Commonbanner title="Book Details" breadcrumbItems={breadcrumbItems} />
      <div className="lg:mx-14">
        <BookDetailsData data={data} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
};

export default BookDetails;
