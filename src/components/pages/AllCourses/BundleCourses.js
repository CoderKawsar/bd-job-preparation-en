"use client";

import { getFromLocalStorage } from "@/utils/local-storage";
import BundleCourse from "./BundleCourse";
import Cookies from "js-cookie";
import axios from "axios";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentModal from "@/components/shared/PaymentModal";

const BundleCourses = ({ bundle, i, isLast, sub_category_id }) => {
  const router = useRouter();

  // states
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubscriptionDuration, setSelectedSubscriptionDuration] =
    useState(null);

  // effects
  useEffect(() => {
    if (paymentMethod) {
      handleBundlePayment(selectedSubscriptionDuration);
    }
  }, [paymentMethod]);

  // handle form submit(payment and buy)
  const handleBundlePayment = async (selectedSubscriptionDuration) => {
    Cookies.set("order_type", "bundle_course");
    Cookies.set(
      "creationPayload",
      JSON.stringify({
        sub_category_id,
        subscription_duration_in_months: selectedSubscriptionDuration,
      })
    );

    if (paymentMethod === "bkash") {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
        {
          amount: `${bundle?.total_cost}`,
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
          amount: `${bundle?.total_cost}`,
        }
      );
      router.push(payment?.data);
    } else if (paymentMethod === "stripe") {
      const { data: payment } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/payment/create`,
        {
          amount: `${bundle?.total_cost}`,
          sub_category_id,
          subscription_duration_in_months: selectedSubscriptionDuration,
        },
        {
          headers: {
            Authorization: getFromLocalStorage(authKey),
          },
        }
      );
      router.push(payment?.url);
    }
  };

  return (
    <div className={`mb-12 ${isLast ? "" : "pb-16 border-dashed border-b-2"}`}>
      <h2 className="text-4xl text-center mb-10 font-bold py-4">
        {bundle?.subscription_duration_in_months} মাসের কোর্স বান্ডিল
      </h2>

      <div className="flex justify-center gap-20">
        {bundle?.subscriptions.map((subscription) => (
          <BundleCourse
            key={subscription?.course_id}
            course_id={subscription?.course_id}
            cost={subscription?.cost}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="border rounded mt-10 ">
          <div className="py-5 px-5 flex flex-col justify-center items-center">
            <h3 className="text-xl text-center font-bold pb-5">
              {" "}
              মোট {bundle?.total_cost} টাকা
            </h3>
            <button
              // onClick={() =>
              //   handleBundlePayment(bundle?.subscription_duration_in_months)
              // }
              onClick={() => {
                setSelectedSubscriptionDuration(
                  bundle?.subscription_duration_in_months
                );
                setModalOpen(true);
              }}
              className="bg-yellowPrimary text-white py-3 px-10 transition-all duration-300 rounded  hover:bg-bluePrimary "
            >
              বান্ডিল কোর্সটি কিনুন
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <PaymentModal
          setModalOpen={setModalOpen}
          setPaymentMethod={setPaymentMethod}
          amount={bundle?.total_cost}
        />
      )}
    </div>
  );
};

export default BundleCourses;
