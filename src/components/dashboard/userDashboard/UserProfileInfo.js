'use client'
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { useGetMyShippingAddressQuery } from "@/redux/api/usersApi";
import Link from "next/link";
import React from "react";
import { MdModeEditOutline } from "react-icons/md";

const UserProfileInfo = () => {
  const { userId } = getUserInfo();
  const { data } = useGetSingleUserQuery(userId);
  const { data: addressData } = useGetMyShippingAddressQuery();





  return (
   <>
    <div className=" rounded-lg py-5 border border-gray-200 ">
      <div className="flex items-center justify-between px-10">
        <div>
          <h2 className="text-2xl font-bold">আপনার নামঃ {data?.name ? data.name : 'নাম যোগ করুন'} </h2>

        </div>
        <div>
          <Link
            href={`/profile/edit/${data?._id}`}
            className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 ml-10 rounded"
          >
            <span>এডিট করুন</span> <MdModeEditOutline />
          </Link>
        </div>



      </div>


      <div className="pl-10 w-96">
        <h5 className="text-lg font-semibold py-3">মোবাইল নাম্বার:  {data?.contact_no ? data?.contact_no : 'মোবাইল নাম্বার যোগ করুন'}</h5>

        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-md font-semibold py-1">ইমেইল: {data?.email ? data?.email : "আপনার ইমেইল যোগ করুন"}</h5>

            <p>{data?.address}</p>
          </div>
        
        </div>

      </div>


    </div>


{
  addressData && <div className="flex items-center justify-between rounded-lg py-5 px-10 mt-6 border border-gray-200">
  <div>
  <h2 className="font-semibold text-lg">আপনার শিপিং তথ্য:</h2> 
<p>বাসা/ হোল্ডিং নাম্বার: {addressData?.address}</p>
<p>আপনার নাম: {addressData?.billing_name}</p>
<p>আপনার  মোবাইল নাম্বার  : {addressData?.contact_no}</p>
<p>জেলা: {addressData?.district}</p>
<p>উপজেলা: {addressData?.upazilla}</p>
<p>বিভাগ: {addressData?.division}</p>

<p> 
    ক্রিয়েট করেছেন : {addressData?.updatedAt &&
      new Date(addressData.updatedAt).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}
  </p>
  </div>

  <div>
          <Link
          //  /shipping-addresses/:shipping_address_id

            href={`/profile/editShipping/${addressData?._id}`}
            className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 ml-10 rounded"
          >
            <span>এডিট করুন</span> <MdModeEditOutline />
          </Link>
        </div>

</div>
}

   </>
  );
};

export default UserProfileInfo;