"use client";

import InitialLoader from "@/components/Loader/InitialLoader";
import UserPdfCard from "@/components/dashboard/userDashboard/UserPdfCard";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";
import { useGetMyAllOrdersDetailsQuery } from "@/redux/api/orderApi";
import { useState } from "react";

const MyPurchasePdfPage = () => {
  const { data, isLoading, isError } = useGetMyAllOrdersDetailsQuery();

  const bookOrdersData = data?.orders;

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && !isError) {
    // content = <Error/>;
    content = (
      <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 my-5 px-3 rounded text-lg">
        <h5>আপনি এখনো কোন বই কিনেন নি </h5>
      </tr>
    );
  }

  if (!isLoading && !isError && bookOrdersData?.length === 0) {
    content = (
      <>
        {" "}
        <>
          <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
            <h5>আপনি কোন বই কিনেন নি এখনো</h5>
          </div>
          <div></div>
        </>
      </>
    );
  }

  if (!isLoading && !isError && bookOrdersData?.length > 0) {
    content = bookOrdersData?.map((item, index) => (
      <UserPdfCard key={item?.id} item={item} index={index} />
    ));
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 mb-20">{content}</div>
    </>
  );
};

export default MyPurchasePdfPage;
