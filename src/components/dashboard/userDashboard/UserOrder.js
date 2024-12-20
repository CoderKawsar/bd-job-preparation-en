"use client";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetMyAllOrdersDetailsQuery } from "@/redux/api/orderApi";
import SingleOrderDetails from "./SingleOrderDetails";

const UserOrder = () => {
  const { data, isLoading, isError } = useGetMyAllOrdersDetailsQuery();
  // (data, 'form user order');
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
        <h5>No order found</h5>
      </tr>
    );
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
    content = bookOrdersData?.map((item) => (
      <SingleOrderDetails key={item?.id} item={item} />
    ));
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2"></div>
      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="">
                <th>Your Books </th>
                <th>Total Price</th>
                <th>Buy Date</th>
                <th>trx id</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserOrder;
