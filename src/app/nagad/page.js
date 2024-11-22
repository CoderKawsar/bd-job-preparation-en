"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { usePayForExamMutation } from "@/redux/api/examsApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  useSubscribeToCourseBundleMutation,
  useSubscribeToCourseMutation,
} from "@/redux/api/courseApi";
import { useUpdateShippingAddressMutation } from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import { useAddOrderMutation } from "@/redux/api/ordersApi";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Swal from "sweetalert2";
import nagadImage from "@/assets/images/nagad_logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";

function Success() {
  const user_id = getUserInfo()?.userId;
  const searchParams = useSearchParams();
  const [payForExam] = usePayForExamMutation();
  const [subscribeToCourse] = useSubscribeToCourseMutation();
  const [subscribeToCourseBundle] = useSubscribeToCourseBundleMutation();
  const [updateShippingAddress] = useUpdateShippingAddressMutation();
  const [addOrder] = useAddOrderMutation();
  const nagadPaymentStatus = searchParams.get("status");
  const nagadPaymentRefId = searchParams.get("payment_ref_id");
  const nagadPaymentMessage = searchParams.get("message");
  const payloadString = Cookies.get("creationPayload");
  const orderType = Cookies.get("order_type");
  const { books } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const processPayment = async () => {
      if (nagadPaymentStatus === "Success") {
        try {
          // if book ordered, create book payload
          let booksPayload;
          if (books?.length) {
            booksPayload = books?.map((book) => {
              return {
                book_id: book?._id,
                quantity: book?.quantity,
              };
            });
          }
          if (payloadString) {
            const payload = JSON.parse(payloadString);
            payload.payment_ref_id = nagadPaymentRefId;

            if (orderType === "subscription") {
              const res = await subscribeToCourse(payload);
              if (Boolean(res?.data)) {
                Swal.fire({
                  title: "Congratulations! Payment Successful",
                  text: "You  can now continue your subscribed course!",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Error buying course! Contact to admin",
                  icon: "error",
                });
              }
            } else if (orderType === "exam") {
              const res = await payForExam(payload);
              if (Boolean(res?.data)) {
                Swal.fire({
                  title: "Congratulations! Payment Successful",
                  text: "You  can now participate to the paid exam!",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Error paying for exam! Contact to admin",
                  icon: "error",
                });
              }
            } else if (orderType === "hard copy") {
              const shippingAddressPayload = {
                user_id,
                division: payload?.division,
                district: payload?.district,
                upazilla: payload?.upazilla,
                address: payload?.address,
                contact_no: payload?.contact_no,
                billing_name: payload?.billing_name,
              };
              if (payload?.is_default) {
                await updateShippingAddress(shippingAddressPayload);
              }
              // create order
              const order = await addOrder({
                payment_ref_id: nagadPaymentRefId,
                shipping_address: JSON.stringify(shippingAddressPayload),
                books: booksPayload,
              });
              if (Boolean(order?.data)) {
                dispatch(clearCart());
                Swal.fire({
                  title: "Congratulations! Payment Successful",
                  text: " Your order has been successful!",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Error paying for exam! Contact to admin",
                  icon: "error",
                });
              }
            } else if (orderType === "bundle_course") {
              const res = await subscribeToCourseBundle({
                sub_category_id: payload?.sub_category_id,
                subscription_duration_in_months:
                  payload?.subscription_duration_in_months,
                payment_ref_id: nagadPaymentRefId,
              });
              if (Boolean(res?.data)) {
                Swal.fire({
                  title: "Congratulations! Payment Successful",
                  text: " Your bundle course has been bought successfully.!",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Error paying for exam! Contact to admin",
                  icon: "error",
                });
              }
            }
          }
          if (orderType === "pdf") {
            const order = await addOrder({
              payment_ref_id: nagadPaymentRefId,
              books: booksPayload,
            });
            if (Boolean(order?.data)) {
              dispatch(clearCart());
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: " Your order has been successfully.!",
                icon: "success",
              });
            } else {
              toast.error("Order creation failed!");
            }
          }
        } catch (error) {
          toast.error(
            "Order failed!  Contact to BD Job Preparation admin!",
            error
          );
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: `Error! Payment ${nagadPaymentStatus}!!!`,
          icon: "error",
        });
      }
      Cookies.remove("order_type");
      Cookies.remove("creationPayload");
    };
    processPayment();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center my-10 mx-2 md:mx-16">
        <div className="w-96 md:w-full flex justify-center flex-col items-center border p-12 bg-green-200">
          <div>
            <div className="flex justify-center">
              <Image
                src={nagadImage}
                alt="success-img"
                width={400}
                height={200}
              />
            </div>

            <div className="mt-6 mb-16">
              {nagadPaymentStatus === "Success" ? (
                <div className="flex flex-col gap-y-4 items-center">
                  <h3 className="text-2xl md:text-3xl text-green-500 text-center">
                    Payment Status:{" "}
                    <span className="text-black">{nagadPaymentStatus}</span>
                  </h3>
                  <p className="text-xl text-green-500 text-center">
                    Your payment_ref_id is:{" "}
                    <span className="text-black  text-sm max-w-full break-all">
                      {nagadPaymentRefId}
                    </span>{" "}
                  </p>
                  <p className="text-center px-4 py-2 text-green-500 bg-red-200 shadow rounded font-medium">
                    Go to Dashboard to enjoy your paid content
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-y-2 items-center">
                  <h3 className="text-3xl text-red-500">
                    Your payment was not successful.
                  </h3>
                  <p className="text-xl text-green-500">
                    Payment status:{" "}
                    <span className="text-red-500">{nagadPaymentStatus}</span>{" "}
                  </p>
                  <p className="text-lg text-green-500">
                    Message:{" "}
                    <span className="text-red-500">{nagadPaymentMessage}</span>
                  </p>
                  <p className="px-4 py-2 text-green-500 bg-red-200 shadow rounded font-medium">
                    Please complete your payment successfully
                  </p>
                </div>
              )}
            </div>
            <div className="mt-16 flex justify-center items-center">
              <Link
                className="bg-bluePrimary text-white text-center py-2 px-3 md:py-5 md:px-10 transition-all duration-300 rounded hover:bg-cyanPrimary mr-5"
                href="/"
              >
                Go to Home
              </Link>
              <Link
                className="bg-yellowPrimary text-white text-center py-2 px-3 md:py-5 md:px-10 transition-all duration-300 rounded hover:bg-cyanPrimary"
                href="/profile"
              >
                Go to your Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Success;
