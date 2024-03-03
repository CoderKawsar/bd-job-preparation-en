"use client";

import { authKey } from "@/constants/storage";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Nagad() {
  const router = useRouter();
  const handleNagadPayment = async () => {
    const { data: payment } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/nagad/payment/create`,
      {
        amount: `1`,
        orderId: "djkfsjkdsdssfsmndjdf",
        productDetails: {
          _id: "kdjk",
          name: "test",
          price: 20,
        },
        clientType: "PC_WEB",
      }
    );
    router.push(payment?.data);
  };

  const verifyPayment = async () => {
    try {
      const payment_ref_id =
        "MDIwNDEyMTIzNDY4NS42ODMwMDIwMDcxMDQyMjUuSW52NjBkOTMxLmFjMjYzZTMxYTk5MjMwY2VmZTdw";
      const { data: payment } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nagad/payment/verify/${payment_ref_id}`
      );
      // if payment is verified, comes here
      (payment);
    } catch (error) {
      // comes here if payment not verified
      (error, "error");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 my-20">
      <h2>Nagad Test</h2>
      <button
        className="px-3 py-2 bg-cyan-400 text-gray-500 rounded"
        onClick={handleNagadPayment}
      >
        Test
      </button>
      <button
        onClick={verifyPayment}
        className="px-3 py-2 bg-green-400 text-gray-500 rounded"
      >
        verify payment
      </button>
    </div>
  );
}
