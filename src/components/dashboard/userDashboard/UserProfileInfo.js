"use client";
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
            <h2 className="text-2xl font-bold">
              Your Name: {data?.name ? data.name : "Add Name"}{" "}
            </h2>
          </div>
          <div>
            <Link
              href={`/profile/edit/${data?._id}`}
              className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 ml-10 rounded"
            >
              <span>Edit</span> <MdModeEditOutline />
            </Link>
          </div>
        </div>

        <div className="pl-10 w-96">
          <h5 className="text-lg font-semibold py-3">
            Mobile Number:{" "}
            {data?.contact_no ? data?.contact_no : "Add Mobile Number"}
          </h5>

          <div className="flex justify-between items-center">
            <div>
              <h5 className="text-md font-semibold py-1">
                Email: {data?.email ? data?.email : "Add your email"}
              </h5>

              <p>{data?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {addressData && (
        <div className="flex items-center justify-between rounded-lg py-5 px-10 mt-6 border border-gray-200">
          <div>
            <h2 className="font-semibold text-lg">Your Shipping Address:</h2>
            <p>House / Holding Number: {addressData?.address}</p>
            <p>Your Name: {addressData?.billing_name}</p>
            <p>Your Mobile Number : {addressData?.contact_no}</p>
            <p>District: {addressData?.district}</p>
            <p>Upazilla: {addressData?.upazilla}</p>
            <p>Divission: {addressData?.division}</p>

            <p>
              Created At :{" "}
              {addressData?.updatedAt &&
                new Date(addressData.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
            </p>
          </div>

          <div>
            <Link
              //  /shipping-addresses/:shipping_address_id

              href={`/profile/editShipping/${addressData?._id}`}
              className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 ml-10 rounded"
            >
              <span>Edit</span> <MdModeEditOutline />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileInfo;
