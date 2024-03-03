import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import PaymentModal from "@/components/shared/PaymentModal";
import { authKey } from "@/constants/storage";
import { useGetAllSubscriptionsQuery } from "@/redux/api/courseApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CourseSubscriptions({ course_id }) {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { data, isError, isLoading } = useGetAllSubscriptionsQuery({
    course_id,
  });
  const subscriptionData = data?.subscriptions?.data;

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

  if (!isLoading && !isError && subscriptionData?.length === 0) {
    content = (
      <h5 className=" font-semibold bg-green-600  text-white p-3 rounded text-md">
        সাবস্ক্রিপশন কোর্স শীঘ্রই আসছে
      </h5>
    );
  }

  if (!isLoading && !isError && subscriptionData?.length > 0) {
    content = subscriptionData?.map((subscription) => (
      <tr className="hover" key={subscription?._id}>
        <td>{subscription?.name}</td>
        <td>{subscription?.subscription_duration_in_months} Months</td>
        <td>{subscription?.cost}{" "}টাকা</td>
        <td>
          <p
            onClick={() => {
              setSelectedSubscription(subscription);
              setModalOpen(true);
            }}
            className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0  cursor-pointer w-fit"
          >
            কোর্স কিনুন
          </p>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <div>
        
        <table className="table table-auto">
          {/* head */}
          <thead>
            <tr className="text-[16px]">
              <th>সাবস্ক্রিপশন নাম</th>
              <th>সময়কাল</th>
              <th>মূল্য</th>
              <th>অ্যাকশন </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
      {modalOpen && (
        <PaymentModal
          setModalOpen={setModalOpen}
          setPaymentMethod={setPaymentMethod}
          amount={selectedSubscription?.cost}
        />
      )}
    </>
  );
}

export default CourseSubscriptions;
