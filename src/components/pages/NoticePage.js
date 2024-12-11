"use client";

import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import InitialLoader from "../Loader/InitialLoader";
import Error from "../Loader/Error";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Pagination from "@/app/(dashboard)/Pagination";

const NoticePage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllNoticesQuery({
    limit,
    page,
  });

  const allNotices = data?.notices?.data;

  const totalData = data?.notices?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  const [expandedNoticeId, setExpandedNoticeId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

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

  if (!isLoading && !isError && allNotices?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>No Notice Found</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && allNotices?.length > 0) {
    content = allNotices?.map((item) => (
      <div className=" bg-white rounded-lg shadow-md border-b-2" key={item?.id}>
        <div
          className="flex cursor-pointer items-center"
          onClick={() => toggleDescription(item?.id)}
        >
          <div className="bg-green-500 text-white px-3 rounded py-4">
            <h2>{formatDate(item?.createdAt)}</h2>
          </div>
          <div className="pl-5">
            <div className="flex justify-between">
              <h2 className="font-bold text-xl">{item?.title}</h2>
              {expandedNoticeId === item?.id ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {expandedNoticeId === item?.id && <p>{item?.description}</p>}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="my-20">
        <h2 className="text-center font-bold text-3xl my-4">View All Notice</h2>
        <div className="my-5 space-y-4">{content}</div>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default NoticePage;
