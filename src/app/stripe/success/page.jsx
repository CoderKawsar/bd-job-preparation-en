"use client";

import Image from "next/image";
import successImg from "../../../assets/images/success.svg";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Cookies from "js-cookie";

const StripePaymentSuccess = () => {
  const dispatch = useDispatch();
  const orderType = Cookies.get("order_type");

  useEffect(() => {
    if (orderType === "hard copy" || orderType === "pdf") {
      dispatch(clearCart());
    }
    Swal.fire({
      title: "Congratulations! Payment Successful",
      text: " Your order has been successfull!",
      icon: "success",
    });
    Cookies.remove("order_type");
    Cookies.remove("creationPayload");
  }, []);
  return (
    <div>
      <Navbar />
      <div className=" flex flex-col justify-center items-center my-10">
        <div className="flex justify-center flex-col items-center border w-fit p-12 bg-green-200">
          <div className="space-y-5">
            <div className="flex justify-center">
              <Image
                src={successImg}
                alt="success-img"
                width={400}
                height={200}
              />
            </div>
            <h3 className="text-5xl text-yellowPrimary pb-8">
              {" "}
              Your Payment is successful!
            </h3>
            <p className="pb-10 text-xl">
              You Can continue our paid services which have bought
            </p>
            <Link
              className="mt-8 bg-bluePrimary text-white py-5 px-10 transition-all duration-300 rounded hover:bg-cyanPrimary mr-5"
              href="/"
            >
              Go to Home
            </Link>
            <Link
              className="mt-8 bg-yellowPrimary text-white py-5 px-10 transition-all duration-300 rounded hover:bg-cyanPrimary"
              href="/profile"
            >
              Go to your Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StripePaymentSuccess;
