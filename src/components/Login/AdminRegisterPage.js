"use client";

import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { storeUserInfo } from "@/services/auth.service";

const AdminRegisterPage = () => {
  const [userSignup] = useUserSignupMutation();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      // const res = await userSignup({ ...data }).unwrap();
      await userSignup({ ...data }).unwrap();
      // (res, ' from res');
      toast.success("ইউজার সফল্ভাবে রেজিস্টার হয়েছে ।");
    } catch (err) {
      if (
        err.data?.statusCode === 500 &&
        err.data?.errorMessages.includes("duplicate key")
      ) {
        // Handle duplicate key error (email already exists)
        toast.error("Email already exists. Please use a different email.");
      } else {
        // Handle other errors
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="bg-white border rounded shadow-lg max-w-md mx-auto py-5 my-10 z-0">
      <div>
        <h2 className="text-lg font-bold text-center pb-10 pt-5 text-cyanPrimary">
          বিডি জব প্রিপারেশনে আপনাকে স্বাগতম।
        </h2>

        <div className="mb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="flex justify-center">
              <input
                type="text"
                {...register("name")}
                placeholder="আপনার নাম"
                className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200"
                required
              />
            </div>
            <div className="flex justify-center">
              <input
                type="email"
                {...register("email")}
                placeholder="আপনার ইমেইল"
                className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200"
              />
            </div>
            <div className="flex justify-center">
              <input
                type="number"
                {...register("contact_no")}
                placeholder="আপনার মোবাইল নাম্বার"
                className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200"
                required
              />
            </div>
            <div className="flex justify-center">
              <div className="relative w-80">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="border py-4 px-3 rounded outline-none hover:border-gray-500 w-full bg-gray-200 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-4 py-2   rounded"
                >
                  {showPassword ? <VscEyeClosed /> : <VscEye />}
                </button>
              </div>
            </div>

            <input
              type="submit"
              value="রেজিস্টার করুন"
              className="bg-bluePrimary text-white py-4 px-3 transition-all duration-300 rounded hover:bg-cyanPrimary w-80 ml-16 cursor-pointer"
            />
          </form>

          <div className="py-5 text-center">
            <p>
              {" "}
              আপনার এক্যাউন্ট আছে ?{" "}
              <Link
                href="/login"
                className="text-bold text-bluePrimary text-lg hover:underline"
              >
                লগইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
