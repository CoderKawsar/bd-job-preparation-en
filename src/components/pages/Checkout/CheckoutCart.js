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
                <h2>${item?.quantity * item?.price} </h2>
              </div>
            </div>
          ))}
          <hr />
          <div>
            <div>
              <h2 className="font-bold text-xl text-bluePrimary">
                Shipping Method
              </h2>
              <p className="border px-2 py-1">
                {" "}
                Delivery Charge: ${shippingCharge}
              </p>
            </div>
            <div className="py-5">
              <h2 className="font-bold text-xl text-bluePrimary">
                Payment Method
              </h2>
              <p className="border px-2 py-1">Bkash </p>
              <p className="border px-2 py-1">Nagad </p>
            </div>
            <div className="pt-5">
              <div className="flex justify-between items-center text-start">
                <h2>Subtotal:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  ${total.toFixed(2)}{" "}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Shipping Fee :</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  ${shippingCharge}{" "}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Tax:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  0.00 টাকা
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Discount:</h2>
                <h2 className="font-bold text-xl text-bluePrimary">$0.00</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Total :</h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  ${(total + shippingCharge).toFixed(2)}{" "}
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
