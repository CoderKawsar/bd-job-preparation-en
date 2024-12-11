"use client";

import {
  useGetMyShippingAddressQuery,
  useUpdateShippingAddressMutation,
} from "@/redux/api/usersApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserEditShippingPage = () => {
  const router = useRouter();
  const params = useParams();

  const { id } = params;
  const { data } = useGetMyShippingAddressQuery();

  const [address, setAddress] = useState("");
  const [billing_name, setBilling_name] = useState("");
  const [contact_no, setContact_no] = useState("");
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [upazilla, setUpazilla] = useState("");

  const defaultValues = {
    address: data?.address,
    billing_name: data?.billing_name,
    contact_no: data?.contact_no,
    district: data?.district,
    division: data?.division,
    upazilla: data?.upazilla,
  };
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const [updateUser] = useUpdateShippingAddressMutation();

  useEffect(() => {
    setAddress(data?.address);
    setBilling_name(data?.billing_name);
    setContact_no(data?.contact_no);
    setDistrict(data?.district);
    setDivision(data?.division);
    setUpazilla(data?.upazilla);
  }, [data]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        id,
        address,
        billing_name,
        contact_no,
        district,
        division,
        upazilla,
      });
      if (res) {
        toast.success("Shipping Info updated successfully");
        router.push("/profile");
      } else {
        toast.error("Something is wrong to update shipping info");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg py-6 border border-gray-200 px-10 ">
        <h3 className="font-medium text-lg text-center pb-3">
          Edit Shipping Info
        </h3>
        <form onSubmit={onHandleSubmit}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address"
            className="input input-bordered input-md w-full max-w-xs mr-5 outline-none mb-4"
          />

          <input
            type="text"
            value={billing_name}
            onChange={(e) => setBilling_name(e.target.value)}
            placeholder="Your Billing Name"
            className="input input-bordered input-md w-full max-w-xs mr-5 outline-none mb-4"
          />

          <input
            type="number"
            value={contact_no}
            onChange={(e) => setContact_no(e.target.value)}
            placeholder="Your Mobile Number"
            className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
          />

          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Your District"
            className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
          />

          <input
            type="text"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            placeholder="Your Division"
            className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
          />

          <input
            type="text"
            value={upazilla}
            onChange={(e) => setUpazilla(e.target.value)}
            placeholder="Your Upazilla"
            className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
          />

          <br />

          <input
            type="submit"
            value="Save"
            className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded"
          />
        </form>
      </div>
    </>
  );
};

export default UserEditShippingPage;
