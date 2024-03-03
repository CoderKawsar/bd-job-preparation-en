"use client";

import { useDispatch, useSelector } from "react-redux";

const CheckoutCart = ({ shippingCharge }) => {
  // redux
  const { books, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-white border rounded py-10">
        <div className="px-6">
          {books?.map((item) => (
            <div key={item?._id}>
              <div className="flex justify-between items-center pb-5">
                <h2>{item?.title}</h2>
                <h2>{item?.quantity * item?.price} {" "} টাকা</h2>
              </div>
            </div> 
          ))}
          <hr />
          <div>
            <div>
              <h2 className="font-bold text-xl text-bluePrimary">
                শিপিং মেথড 
              </h2>
              <p className="border px-2 py-1">
                {" "}
                ডেলিভারি চার্জ: {shippingCharge} {" "} টাকা
              </p> 
            </div>
            <div className="py-5">
              <h2 className="font-bold text-xl text-bluePrimary">
                পেমেন্ট মেথড 
              </h2>
              <p className="border px-2 py-1">বিকাশ </p>
              <p className="border px-2 py-1">নগদ </p>
            </div>
            <div className="pt-5">
              <div className="flex justify-between items-center text-start">
                <h2>সাব টোটাল:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  {total.toFixed(2)} {" "} টাকা
                </h2> 
              </div>
              <div className="flex justify-between items-center">
                <h2>শিপিং ফি :</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  {shippingCharge} {" "} টাকা
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>ট্যাক্স:</h2> 
                <h2 className="font-bold text-xl text-bluePrimary">0.00 {" "} টাকা</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>ডিসকাউন্ট:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">0.00 {" "} টাকা</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>সর্বমোট :</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  {(total + shippingCharge).toFixed(2)}{" "}{" "} টাকা
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
