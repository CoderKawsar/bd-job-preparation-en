"use client";

import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import { authKey } from "@/constants/storage";
import { useGetAllSubscriptionsQuery } from "@/redux/api/courseApi";

import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import PaymentModal from "@/components/shared/PaymentModal";

const CourseSubscribe = ({ course_id }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  const { data, isError, isLoading } = useGetAllSubscriptionsQuery({
    course_id,
  });
  const allSubsCourses = data?.subscriptions?.data;

  // states
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // effects
  useEffect(() => {
    if (paymentMethod) {
      enrollToCourse(selectedSubscription);
    }
  }, [paymentMethod]);

  // handlers
  const enrollToCourse = async (subscription) => {
    if (!userLoggedIn) {
      return toast.error("Please signin to buy a subscribe course");
    }

    const coursePaymentPayload = {
      user_id: getUserInfo()?.userId,
      subscription_id: subscription?.id,
    };
    Cookies.set("order_type", "subscription");
    Cookies.set("creationPayload", JSON.stringify(coursePaymentPayload));

    if (paymentMethod === "bkash") {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
        {
          amount: `${subscription?.cost}`,
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
          amount: `${subscription?.cost}`,
        }
      );
      router.push(payment?.data);
    } else if (paymentMethod === "stripe") {
      const { data: payment } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/payment/create`,
        {
          amount: `${subscription?.cost}`,
          subscription_id: subscription?.id,
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

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && allSubsCourses?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && allSubsCourses?.length > 0) {
    content = allSubsCourses?.map((item) => (
      <div key={item?._id} className="  rounded border shadow-md">
        <div className="card svg-card text-center p-4 ">
          <div className="flex justify-center">
            <span></span>
          </div>
          <div className="card-body">
            <h5 className="text-center font-bold text-xl">{item?.name}</h5>
            <h1 className="font-black text-xl">
              <sup>$</sup>
              {item?.cost}
            </h1>
            <p className="opacity-75 font-bold text-xl">
              সময়কাল: {item?.subscription_duration_in_months} মাস
            </p>
            <p className="opacity-75 py-2">
              কোর্সের শিরোনাম: {item?.course_id?.title}
            </p>
            <p className="opacity-75 py-2">
              কোর্স প্রশিক্ষক: {item?.course_id?.author}
            </p>
            <button
              onClick={() => {
                setSelectedSubscription(item);
                setModalOpen(true);
              }}
              className="bg-bluePrimary text-white py-3 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary "
              href="/subscribe"
            >
              Buy Now
            </button>
          </div>
          <div className="custom-shape-divider-bottom-1645939714">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    ));
  }

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Courses ", link: "/courses" },

    { label: "Course Subscribe" },
  ];

  return (
    <div>
      <Commonbanner
        title="Course Subscribe"
        breadcrumbItems={breadcrumbItems}
      />
      <div className="py-10 mx-14">
        <div className="grid lg:grid-cols-3 gap-4">{content}</div>
        {modalOpen && (
          <PaymentModal
            setModalOpen={setModalOpen}
            setPaymentMethod={setPaymentMethod}
            amount={selectedSubscription?.cost}
          />
        )}
      </div>
    </div>
  );
};

export default CourseSubscribe;
