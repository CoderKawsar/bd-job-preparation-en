import bkashImg from "@/assets/images/Bkash logo.png";
import nagadImg from "@/assets/images/nagad-logo-horizontal.png";
import stripeImg from "@/assets/images/stripe_logo.png";
import Image from "next/image";

function PaymentModal({ setPaymentMethod, setModalOpen, amount }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-100 p-10 rounded-md transition-all duration-300 ease-in-out">
      <h2 className="text-center mb-6 text-3xl">Payment Method</h2>
      <p className="text-center mb-4 text-xl">Amount: ${amount}</p>
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setPaymentMethod("stripe")}
          className="bg-white rounded h-24 w-48 flex justify-center items-center hover:bg-gray-200"
        >
          <Image
            src={stripeImg}
            className="px-4"
            alt="Stripe"
            width={200}
            height={150}
          />
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("bkash")}
          className="bg-white rounded h-24 w-48 flex justify-center items-center hover:bg-gray-200"
        >
          <Image src={bkashImg} alt="Bkash" width={200} height={150} />
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("nagad")}
          className="bg-white rounded h-24 px-2 w-48 flex justify-center items-center hover:bg-gray-200"
        >
          <Image src={nagadImg} alt="Nagad" width={200} height={150} />
        </button>
      </div>
      <div className="text-center mt-12">
        <p className="border border-black mx-auto w-fit py-2 px-4 rounded mb-2">
          Use Stripe Payment For Demo Purpose
        </p>
        <p>
          Demo Card number:{" "}
          <span className="text-sm font-thin font-sans">
            4242 4242 4242 4242
          </span>
        </p>
        <p>
          MM/YY: <span className="text-sm font-thin font-sans">12/29</span>
        </p>
        <p>
          CVV: <span className="text-sm font-thin font-sans">123</span>
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="flex justify-center items-center bg-red-400 text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary mt-12"
          type="button"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
