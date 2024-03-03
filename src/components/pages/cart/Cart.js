"use client";

import Commonbanner from "@/components/banners/Commonbanner";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {
  useAddToCartMutation,
  useDeletecartMutation,
  useGetAllCartsByUserQuery,
} from "@/redux/api/cartApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  removeOneBook,
  addToCart,
} from "@/redux/features/cart/cartSlice";

const Cart = () => {
  const { books, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //  (books)
  // const [total, setTotal] = useState(0); // State to hold the total price

  // useEffect(() => {
  //   // Calculate total when the cart changes
  //   if (cartLength) {
  //     const newTotal = cartLength.reduce(
  //       (acc, item) => acc + item.quantity * item.book_id.price,
  //       0
  //     );
  //     setTotal(newTotal);
  //   }
  // }, [cartLength]);

  const [deletecart] = useDeletecartMutation();
  // const handleDelete =  (item) => {
  //  dispatch(removeFromCart(item))
  //    toast("your cart's book deleted")
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to delete this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     });

  //     if (result.isConfirmed) {
  //       // User confirmed deletion
  //       const res = await deletecart(id);
  //       // (res)

  //       if (res?.data?._id === id) {
  //         // Item deleted successfully
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: "Your file has been deleted.",
  //           icon: "success",
  //         });
  //       } else {
  //         // Something went wrong with deletion
  //         Swal.fire({
  //           title: "Error!",
  //           text: "Something went wrong with deletion.",
  //           icon: "error",
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     // Handle any errors that occur during the process
  //     toast.error(err.message);
  //   }
  // };

  // const handleIncrement = async (book_id) => {
  //   await addToCart({ book_id, quantity: 1 });
  // };

  // const handleDecrement = async (book_id, quantity) => {
  //   if (quantity > 1) {
  //     await addToCart({ book_id, quantity: -1 });
  //   } else {
  //     toast.success("Quantity is already 1, cannot decrement further");
  //   }
  // };

  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "সকল  বইসমূহ", link: "/books" },
    // { label: "বুকস্ Details", link: "/books/:id" },
    { label: " ঝুড়ি" },
  ];
 
  return (
    <>
      <Commonbanner title="কার্ট" breadcrumbItems={breadcrumbItems} />
      <div className=" py-10 max-w-3xl mx-auto">
        <div className="">
          <div className="flex items-center mb-10 space-x-5">
            <h2 className="font-bold text-2xl text-bluePrimary"> আপনার ঝুড়ি </h2>
            <h2 className="font-bold text-xl "> {books?.length} টি</h2>
          </div>
          <div className="bg-white px-4 py-5 border rounded shadow-md ">
            <div className=" grid grid-cols-4 gap-10">
              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">
                   বই ডিটেইলস
                </h2>
              </div> 
              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">
                  পরিমাণ
                </h2> 
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">
                  ১টার দাম
                </h2> 
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">
                 মোট দাম
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-10">
              {books?.length === 0 ? (
                <div className="font-bold text-red-400 text-xl">
                  {" "}
                  আপনার ঝুড়ি এখন খালি 
                </div>
              ) : (
                <>
                  {books?.map((item) => (
                    <>
                      <div className="" key={item?.id}>
                        <div className="flex  items-center">
                          <div className="pr-7">
                            <Image
                              className="rounded"
                              src={item?.cover_page}
                              alt="book img"
                              width={100}
                              height={50}
                            />
                          </div>

                          <div className="">
                            <h2>{item?.title} </h2>
                            <button
                              className="text-red-500 lg:w-[50px] font-bold"
                             
                              onClick={() => {
                                dispatch(removeFromCart(item));
                                toast.success('বইটি সফলভাবে মুছে ফেলা হয়েছে');
                              }}
                              
                            >
                              বাদ দিন
                            </button>
                          </div> 
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 font-semibold">
                          <button
                            className="border px-2"
                            onClick={() => dispatch(removeOneBook(item))}
                            // onClick={() =>
                            //   handleDecrement(
                            //     item?.book_id?._id,
                            //     item?.quantity
                            //   )
                            // }
                          >
                            {" "}
                            -
                          </button>

                          <h5>{item?.quantity}</h5>
                          <button
                            className="border px-2"
                            onClick={() => dispatch(addToCart(item))}
                            // onClick={() =>
                            //   handleIncrement(
                            //     item?.book_id?._id,
                            //     item?.quantity
                            //   )
                            // }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 font-semibold">
                          <h5>{item?.discount_price} {" "}টাকা</h5>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-3 font-semibold">
                          <h5>{item?.quantity * item?.discount_price} {" "}টাকা</h5>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>

            <hr className="my-5" />
            <div className="flex justify-between items-center ">
              <h2 className="font-bold text-xl text-bluePrimary">
                আপনার অর্ডার  
              </h2>
              <div>
                <h2 className="font-bold text-xl text-gray-400"> মোট </h2>
                <h2 className="font-bold text-xl text-bluePrimary">
                  {total.toFixed(2)} {" "}টাকা
                </h2>
              </div>
            </div>
            <div></div>
          </div>

          <div className="">
            <div className="flex justify-between pt-5">
              <Link
                href="/books"
                className="text-bluePrimary  py-2 px-4 transition-all duration-300 rounded hover:text-red-500 font-bold flex items-center "
              >
                <span className="font-bold pr-3">
                  <FaArrowLeftLong />
                </span>
                আরও বাজার করুন 
              </Link>
              {books?.length > 0 && (
                <Link
                  href="/checkout"
                  className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
                > 
                  চেকআউট পেজে যান{" "}
                  <span className="font-bold pl-3">
                    <FaArrowRightLong />
                  </span>
                </Link>
              )}

              {/* <Link
                  href="/checkout"
                  className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
                >
                  Process to Checkout{" "}
                  <span className="font-bold pl-3">
                    <FaArrowRightLong />
                  </span>
                </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
