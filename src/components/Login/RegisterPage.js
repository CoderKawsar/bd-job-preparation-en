"use client";

import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { storeUserInfo } from "@/services/auth.service";

const RegisterPage = () => {
  const [userSignup] = useUserSignupMutation();
  const router = useRouter();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await userSignup({ ...data }).unwrap();
      if (res?.accessToken) {
        // (res, " from res");
        storeUserInfo({ accessToken: res?.accessToken });
        toast.success("ইউজার সফল্ভাবে রেজিস্টার হয়েছে ।");
        router.push("/");
      }
      else {
        toast.error("Email or Mobile number already exists. Please use a different Email or Number.");
      }
    } catch (err) {
      toast.error(err.message);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white border rounded shadow-lg max-w-md mx-auto py-5 my-10 z-0">
      <div>
        <h2 className="text-lg font-bold text-center pb-10 pt-5 text-cyanPrimary">
        ইজি জব প্রিপারেশনে আপনাকে স্বাগতম।
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
                placeholder="আপনার ইমেইল abc@gmail.com"
                className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200"
              />
            </div>
            <div className="flex justify-center">
              {/* <input
                type="number"
                {...register("contact_no")}
                placeholder="আপনার মোবাইল নাম্বার"
                className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200"
                required
              /> */}
              <input
                type="number"
                {...register("contact_no", {
                  required: "মোবাইল নাম্বার প্রয়োজন",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "মোবাইল নাম্বারটি  ১১ টি সংখ্যা হতে হবে এবং এমন হবে 01742561023",
                  },
                  // pattern: {
                  //   value: /^[0-9]{11}$/, // Regular expression for exactly 11 digits
                  //   message: "মোবাইল নাম্বারটি ১১ টি সংখ্যা হতে হবে",
                  // },
                })}
                placeholder=" 01742561023 আপনার মোবাইল নাম্বার "
                className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200"
              />

            </div>
            {errors.contact_no && (
              <p className="text-red-500">{errors.contact_no.message}</p>
            )}
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

export default RegisterPage;
