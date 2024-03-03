"use client"
import React, { useEffect, useState } from "react";
import { useGetAllOrderStatusQuery, useOrderStatusChangeMutation } from "@/redux/api/orderStatusApi";
import toast from "react-hot-toast";

const SingleOrderStatus = ({ orderDetailsId }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { data: statusData } = useGetAllOrderStatusQuery({
    order_details_id: orderDetailsId,
  });

  const allOrdersStatus = statusData?.allStatus?.data;
  // (allOrdersStatus);

  const [orderStatusChange] = useOrderStatusChangeMutation();

  const handleStatusChange = async () => {
    // const payload = { status: ["Pending Approval", "Approved", "On The Way", "Delivered"] };
    // orderStatusChange({ id: "yourOrderId", body: payload });
    try {
      const response = await orderStatusChange({
        id: allOrdersStatus[0]?._id,
        body: { status: selectedStatus },
      });

      // ("Backend Response:", response);

      if (response.data) {
        toast.success("Order Status Updated Successfully");
        // ("Order Status Before Update:", orderStatus);
        setOrderStatus(selectedStatus);
        // ("Order Status After Update:", selectedStatus);
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      // console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };


  useEffect(() => {
    if (allOrdersStatus?.length) {
      setOrderStatus(allOrdersStatus[0]?.status);
    }
  }, [allOrdersStatus]);

  return (
    <div className="">
      <p className="font-bold"> {orderStatus}</p>
      <select
        id="statusDropdown"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        {["Pending Approval", "Approved", "On The Way", "Delivered"].map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button className="border px-5 py-1 text-red-500 font-bold" onClick={handleStatusChange}>Update Status</button>
    </div>
  );
};

export default SingleOrderStatus;