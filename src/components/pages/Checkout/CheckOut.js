"use client";

import Commonbanner from "@/components/banners/Commonbanner";
import CheckoutCart from "./CheckoutCart";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Loading from "@/app/loading";
import axios from "axios";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useGetShipppingChargeInsideDhakaQuery,
  useGetShipppingChargeOutsideDhakaQuery,
} from "@/redux/api/settingsApi";
import { useGetMyShippingAddressQuery } from "@/redux/api/usersApi";
import PaymentModal from "@/components/shared/PaymentModal";

const CheckOut = () => {
  // declaring states
  const [modalOpen, setModalOpen] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // hooks and misc
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const user_id = getUserInfo()?.userId;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm();
  const selectedDivision = watch("division");

  // data fetch
  const {
    data: user,
    refetch,
    isLoading: userLoading,
  } = useGetSingleUserQuery(user_id);
  const { data: shippingAddress, refetch: refetchShippingAddress } =
    useGetMyShippingAddressQuery();
  const {
    data: shippingChargeInsideDhaka,
    isLoading: shippingInsideDhakaLoading,
  } = useGetShipppingChargeInsideDhakaQuery();
  const {
    data: shippingChargeOutsideDhaka,
    isLoading: shippingOutsideDhakaLoading,
  } = useGetShipppingChargeOutsideDhakaQuery();

  // redux
  const { books, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    if (books?.length) {
      const isThereHardCopyBook = books.some(
        (book) => book.format === "hard copy"
      );
      if (isThereHardCopyBook) {
        setShippingCharge(
          selectedDivision !== "Dhaka"
            ? shippingChargeOutsideDhaka
            : shippingChargeInsideDhaka
        );
      } else {
        setShippingCharge(0);
      }
    }
  }, [
    books,
    shippingChargeInsideDhaka,
    shippingInsideDhakaLoading,
    shippingChargeOutsideDhaka,
    shippingOutsideDhakaLoading,
    selectedDivision,
  ]);

  useEffect(() => {
    refetch();
    refetchShippingAddress();
  }, [user]);

  useEffect(() => {
    if (shippingAddress) {
      setValue("billing_name", shippingAddress.billing_name);
      setValue("division", shippingAddress.division);
      setValue("district", shippingAddress.district);
      setValue("upazilla", shippingAddress.upazilla);
      setValue("address", shippingAddress.address);
      setValue("contact_no", shippingAddress.contact_no);
    }
  }, [shippingAddress]);

  // constants
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কার্ট", link: "/cart" },
    { label: "চেকআউট" },
  ];

  // handle change
  const handleDefaultChange = () => {
    setIsDefault(!isDefault);
  };

  const handlePlaceOrderBtn = async () => {
    try {
      if (!userLoggedIn) {
        toast.error("Login first!");
      } else {
        await handleSubmit(handleFormSubmit)();
        if (isValid) {
          // if form submission is valid, i.e. no error, open modal for payment
          setModalOpen(true);
        }
      }
    } catch (error) {
      toast.error("Error submitting form!");
    }
  };

  // handle form submit/payment/order create
  const handleFormSubmit = async (data) => {
    Cookies.set("order_type", shippingCharge ? "hard copy" : "pdf");
    if (shippingCharge) {
      Cookies.set(
        "creationPayload",
        JSON.stringify({ ...data, is_default: isDefault })
      );
    }
  };

  // payment handler function
  const handlePayment = async () => {
    try {
      if (paymentMethod) {
        if (paymentMethod === "bkash") {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
            {
              amount: `${Number(shippingCharge) + Number(total)}`,
            },
            {
              withCredentials: true,
              headers: { Authorization: getFromLocalStorage(authKey) },
            }
          );
          router.push(data?.data);
        } else if (paymentMethod === "nagad") {
          const { data: payment } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/nagad/payment/create`,
            {
              amount: `${Number(shippingCharge) + Number(total)}`,
            }
          );
          router.push(payment?.data);
        } else if (paymentMethod === "stripe") {
          const shipping_address = Cookies.get("creationPayload");
          const booksPayload = books?.map((book) => {
            return {
              book_id: book?._id,
              quantity: book?.quantity,
            };
          });

          const { data: payment } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/payment/create`,
            {
              amount: `${Number(shippingCharge) + Number(total)}`,
              shipping_address,
              books: booksPayload,
            },
            {
              headers: {
                Authorization: getFromLocalStorage(authKey),
              },
            }
          );
          router.push(payment?.url);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error during payment");
    }
  };

  // handle payment in use effect as it is asynchronous task
  useEffect(() => {
    const performAsyncOperation = () => {
      try {
        const asyncOperation = async () => {
          await handlePayment();
        };

        asyncOperation();
      } catch (error) {
        "Error during asynchronous operation:", error;
      }
    };

    performAsyncOperation();

    // Return a cleanup function (if needed)
    return () => {
      // Cleanup logic (if needed)
    };
  }, [paymentMethod, shippingCharge, total]);

  if (userLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Commonbanner title="চেকআউট" breadcrumbItems={breadcrumbItems} />
        <form className="mx-14" onSubmit={handleSubmit(handleFormSubmit)}>
          <div
            className={`grid lg:grid-cols-2 auto-cols-auto gap-5 py-20 justify-center`}
          >
            <div>
              {shippingCharge ? (
                <div>
                  <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">
                    আপনার শিপিং ঠিকানা
                  </h2>
                  <div className="bg-white border rounded">
                    <div className="max-w-md mx-auto mt-8">
                      <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          বিলিং নাম
                        </label>
                        <input
                          {...register("billing_name", {
                            required: "Billing Name is required",
                          })}
                          className="mt-1 p-2 w-full border"
                          defaultValue={user ? user?.name : ""}
                        />
                        {errors.billing_name && (
                          <p className="text-red-500 text-sm">
                            {errors.billing_name.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            বিভাগ
                          </label>
                          <select
                            {...register("division", {
                              required: "Please select Division",
                            })}
                            className="mt-1 h-10 w-full border"
                          >
                            <option value="Rajshahi">রাজশাহী</option>
                            <option value="Dhaka">ঢাকা</option>
                            <option value="Mymensingh">ময়মনসিংহ</option>
                            <option value="Rangpur">রংপুর</option>
                            <option value="Khulna">খুলনা</option>
                            <option value="Chattogram">চট্টগ্রাম</option>
                            <option value="Barishal">বরিশাল</option>
                            <option value="Sylhet">সিলেট</option>
                          </select>
                          {errors.division && (
                            <p className="text-red-500 text-sm">
                              {errors.division.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            জেলা
                          </label>
                          <input
                            {...register("district", {
                              required: "District is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress ? shippingAddress?.district : ""
                            }
                          />
                          {errors.district && (
                            <p className="text-red-500 text-sm">
                              {errors.district.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            উপজেলা
                          </label>
                          <input
                            {...register("upazilla", {
                              required: "Upazilla is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress ? shippingAddress?.upazilla : ""
                            }
                          />
                          {errors.upazilla && (
                            <p className="text-red-500 text-sm">
                              {errors.upazilla.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            যোগাযোগের মোবাইল নম্বর
                          </label>
                          <input
                            {...register("contact_no", {
                              required: "Contact Number is required",
                              pattern: {
                                value: /^\d{11}$/,
                                message: "Invalid contact number",
                              },
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={user?.contact_no}
                          />
                          {errors.contact_no && (
                            <p className="text-red-500 text-sm">
                              {errors.contact_no.message}
                            </p>
                          )}
                        </div>

                        {/* <div>
                          <label className="block text-sm font-medium text-gray-700">
                            ঢাকার বাইরে?
                          </label>
                          <select
                            {...register("outside_dhaka", {
                              required: "Please select Outside Dhaka",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress
                                ? shippingAddress?.outside_dhaka
                                : true
                            }
                            onChange={(e) =>
                              setSelectedOutsideDhaka(e.target.value === "true")
                            }
                          >
                            <option value="">Select</option>
                            <option value="true">হ্যা</option>
                            <option value="false">না</option>
                          </select>
                          {errors.outside_dhaka && (
                            <p className="text-red-500 text-sm">
                              {errors.outside_dhaka.message}
                            </p>
                          )}
                        </div> */}
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">
                            ঠিকানা
                          </label>
                          <textarea
                            {...register("address", {
                              required: "Address is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress?.address
                                ? shippingAddress?.address
                                : ""
                            }
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm">
                              {errors.address.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2 mb-8">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              onChange={handleDefaultChange}
                              checked={isDefault}
                              className="mr-2"
                            />
                            Set as default address
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div>
              <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">
                আপনার অর্ডারকৃত বইসমূহ
              </h2>
              <CheckoutCart shippingCharge={shippingCharge} total={total} />
            </div>
          </div>
          <div className="">
            <div className="flex justify-between py-5">
              <Link
                href="/cart"
                className="text-bluePrimary py-2 px-4 transition-all duration-300 rounded hover:text-red-500 font-bold flex items-center"
              >
                <span className="font-bold pr-3">
                  <FaArrowLeftLong />
                </span>
                ঝুড়িতে ফিরে যান
              </Link>
              {userLoggedIn ? (
                <button
                  type="button"
                  onClick={handlePlaceOrderBtn}
                  className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
                >
                  অর্ডার প্লেস করুন
                  <span className="font-bold pl-3">
                    <FaArrowRightLong />
                  </span>
                </button>
              ) : (
                <Link href="/login">
                  <button
                    type="button"
                    className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
                  >
                    অর্ডার প্লেস করতে লগ ইন করুন
                    <span className="font-bold pl-3">
                      <FaArrowRightLong />
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
          {/* ====================  Payment modal  ==========================================*/}
          {modalOpen && (
            <PaymentModal
              setModalOpen={setModalOpen}
              setPaymentMethod={setPaymentMethod}
              amount={`${Number(shippingCharge || 0) + Number(total)}`}
            />
          )}
        </form>
      </div>
    );
  }
};

export default CheckOut;
