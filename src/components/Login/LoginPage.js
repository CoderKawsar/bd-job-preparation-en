"use client";

import { useEffect, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await userLogin({ ...data }).unwrap();

      if (res?.accessToken) {
        // User login successful
        storeUserInfo({ accessToken: res?.accessToken });

        toast.success("আপনি সফল্ভাবে লগইন হয়েছেন ।");
        router.push("/");
      } else if (res?.message == "User not found here!") {
        // User not found or other error from the server
        toast.error(
          "User not found or other error. Please check your credentials."
        );
      } else {
        // User not found or other error
        toast.error("আপনার ইমেইল বা মোবাইল নাম্বার বা পাসওয়ার্ড  সঠিক নয় । ");
      }
    } catch (err) {
      if (err?.message === "User not found here!") {
        // User not found or other error from the server
        toast.error(
          "User not found or other error. Please check your credentials."
        );
      } else {
        // Handle other errors
        // console.error("Error during login:", err);
        toast.error("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after the login request completes
    }
  };

  return (
    <div className="bg-white border rounded shadow-lg max-w-md mx-auto py-5 my-10 z-7">
      <div>
        <h2 className="text-lg font-bold text-center pb-10 pt-5 text-cyanPrimary z-7">
          বিডি জব প্রিপারেশনে আপনাকে স্বাগতম।
        </h2>

        <div className="mb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="relative inline-flex">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
              </div>
            ) : (
              "  "
            )}
            <div className="flex justify-center">
              <input
                type="text"
                {...register("email_or_contact")}
                placeholder="আপনার মোবাইল নাম্বার / ইমেইল"
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
              value="লগইন করুন"
              className="bg-bluePrimary text-white py-4 px-3 transition-all duration-300 rounded hover:bg-cyanPrimary w-80 ml-16 cursor-pointer"
            />
          </form>

          <div className="py-5 text-center">
            <p>
              {" "}
              আপনার এক্যাউন্ট নাই ?{" "}
              <Link
                href="/register"
                className="text-bold text-bluePrimary text-lg hover:underline"
              >
                রেজিস্টার করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
