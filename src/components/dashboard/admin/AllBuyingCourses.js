'use client'

import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetAllSubscriptionsHistoryQuery, } from "@/redux/api/courseApi";
import Image from "next/image";
import Link from "next/link";
import AllBuyingCourseDetails from "./AllBuyingCourseDetails";
import { useEffect, useState } from "react";
import Pagination from "@/app/(dashboard)/Pagination";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";


const AllBuyingCourses = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError, refetch  } =
    useGetAllSubscriptionsHistoryQuery({limit, page, searchTerm});

  const courseSubs = data?.subscriptionsHistory?.data;


  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);

  //check permission
  useEffect(()=>{
    if(!checkPermission('order')){

     router.push('/')
    }

  },[])

  const totalData = data?.subscriptionsHistory?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  } else if (isError) {
    content = (
      <div className="flex justify-center items-center font-bold bg-green-400 text-white py-3 rounded text-lg">
        <h5>No one has bought any course yet.</h5>
      </div>
    );
  } else if (courseSubs?.length === 0) {
    content = <EmptyContent />;
  } else {
    content = courseSubs?.map((item) => (
      <AllBuyingCourseDetails key={item?._id} item={item} />
    ));
  }


    return (
        <div className="">

<div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="">
              <th>কোর্সের নাম</th>
              <th>কোর্স প্রশিক্ষক</th>
                <th>কোর্সের সময় </th>
                <th>কোর্সের ক্যাটাগরি </th>
                <th>কোর্সের সাবক্যাটাগরি</th>
                <th> কোর্সের মূল্য</th>
                <th>প্রকাশের তারিখ</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    
 <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/>
     
    </div>
    );
};

export default AllBuyingCourses;