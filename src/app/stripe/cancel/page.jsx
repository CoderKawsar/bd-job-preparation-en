import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const StripePaymentCancel = () => {
  return (
    <div>
      <Navbar />
      <section className="py-20 flex flex-col justify-center items-center">
        <p className="text-center py-10 text-2xl font-bold">
          Forgot to add something to your cart? Shop around then come back to
          pay!
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
      </section>

      <Footer />
    </div>
  );
};

export default StripePaymentCancel;
