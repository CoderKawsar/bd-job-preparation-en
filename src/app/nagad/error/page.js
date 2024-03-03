"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Error() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  Cookies.remove("creationPayload");

  return (
    <>
    <Navbar/>
    <div className="h-screen flex  flex-col justify-center items-center">
      <div className=" items-center border w-fit py-12 px-10 rounded bg-red-400 text-white  text-xl space-y-5">
        <h1 className="text-4xl">OOOPS!!!</h1>
        <h3 className="text-red-900 text-3xl">Payment not completed. Error paying!</h3>

        <p>{message}</p>
        
        <p className=" bg-red-600 py-4 px-8 rounded text-white  text-xl">Please, Try again</p>

       
      </div>
      <Link
        className="mt-8 bg-bluePrimary text-white py-4 px-14 text-2xl transition-all duration-300 rounded hover:bg-cyanPrimary"
        href="/"
      >
        Go to home
      </Link>
    </div>
    <Footer/>
    </>
  );
}

export default Error;
