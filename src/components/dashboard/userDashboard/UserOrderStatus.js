'use client'


import { useGetAllOrderStatusQuery } from "@/redux/api/orderStatusApi";
import { useEffect, useState } from "react";

const UserOrderStatus = ({orderDetailsId}) => {
    const [orderStatus, setOrderStatus] = useState("")
    const { data: statusData } = useGetAllOrderStatusQuery({
        order_details_id: orderDetailsId
    });
    const allOrdersStatus= statusData?.allStatus?.data;
  
    useEffect(()=>{
      if(allOrdersStatus?.length){
        setOrderStatus(allOrdersStatus[0]?.status)

      }
    },[allOrdersStatus])
    return (
        
            <p>{orderStatus} </p>
       
    );
};

export default UserOrderStatus;