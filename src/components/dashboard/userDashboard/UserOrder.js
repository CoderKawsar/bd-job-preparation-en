'use client'
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetMyAllOrdersDetailsQuery } from "@/redux/api/orderApi"
import { useEffect, useState } from "react";
import BookSingleOrders from "./BookSingleOrders";
import SingleOrderDetails from "./SingleOrderDetails";


const UserOrder = () => {

  const {data, isLoading, isError} = useGetMyAllOrdersDetailsQuery();
  // (data, 'form user order');
  const bookOrdersData = data?.orders;
  

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader/>
      </>
    );
  }

  if (!isLoading && !isError) {
    // content = <Error/>;
    content = <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 my-5 px-3 rounded text-lg">
    <h5>আপনার অর্ডার এখন খালি</h5>
  </tr>;
  }

  if (!isLoading && !isError && bookOrdersData?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
      <h5>Your Order is Empty Now</h5>
    </div>
      </>
    );
  }

  if (!isLoading && !isError && bookOrdersData?.length > 0) {
    content = bookOrdersData?.map((item)=> <SingleOrderDetails key={item?.id} item={item}/>);
  }

  return (
    <>
   <div className="grid grid-cols-1 gap-2">
  

   </div>
    <div className="border">
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="">
        <th>আপনার কেনা বইসমুহ </th>
        <th> সর্বমোট  মূল্য</th>
        <th>কেনার তারিখ</th>
        <th>ট্রান্সজেকশন আইডি</th>
        <th>স্ট্যাটাস</th>
        <th>পেমেন্ট</th>
      </tr>
    </thead>
    <tbody>

      {content}
      
     
     
     
      
    </tbody>
  </table>
</div>

    </div>
    </>
  )
}

export default UserOrder
