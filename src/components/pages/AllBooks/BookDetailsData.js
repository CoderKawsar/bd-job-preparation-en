"use client";

import PDFViewerModal from "@/components/ohters/PDFViewerModal";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoEye } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

const BookDetailsData = ({ data, isError, isLoading }) => {
  const { books: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenPDFModal = () => {
    setIsModalOpen(true);
  };

  const onClosePDFModal = () => {
    setIsModalOpen(false);
  };

  const handleAddBook = (data) => {
    const existingBook = cartItems?.find((book) => book._id === data._id);

    if (existingBook) {
      toast.error(
        "You have already added this book to your cart. View your cart."
      );
    } else {
      dispatch(addToCart(data));
      toast.success("Book added to cart successfully");
    }
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <h5>There was an error</h5>;
  }

  if (!isLoading && !isError && data) {
    content = (
      <div className="grid lg:grid-cols-2 gap-5 my-10">
        <div>
          <div className="space-y-4 mb-10">
            <Image
              className="rounded h-60"
              src={data?.cover_page}
              alt="course"
              width={600}
              height={50}
            />
          </div>
        </div>

        <div className="pl-10">
          <div className="bg-white rounded border py-10 px-4 w-96">
            <div className="space-y-4 mb-10">
              <h2 className="text-2xl font-bold">{data?.title}</h2>
              <p>{data?.description}</p>
              <p>Writer: {data?.writer}</p>
              <p>
                Sub-category:{" "}
                <span className=" text-yellowPrimary">
                  {data?.course_id[0]?.sub_category_id?.category_id?.title}
                </span>{" "}
                <span className=" text-bluePrimary pl-5 font-semibold">
                  {" "}
                  Category: {data?.course_id[0]?.sub_category_id?.title}{" "}
                </span>
              </p>
              <p>Book Format: {data?.format}</p>

              <p>${data?.price}</p>
              <div className="flex items-center gap-x-2">
                <IoEye
                  onClick={onOpenPDFModal}
                  className="text-3xl p-1 cursor-pointer rounded bg-bluePrimary text-white hover:bg-blue-500 hover:text-gray-100 transition-all duration-500 ease-in"
                />
                <IoCartOutline
                  onClick={() => handleAddBook(data)}
                  className="text-3xl p-1 cursor-pointer rounded bg-yellowPrimary text-white hover:bg-yellow-500 hover:text-gray-100 transition-all duration-500 ease-in"
                />
                {/* <button
                  onClick={() => handleAddBook(data)}
                  className="bg-yellowPrimary text-white py-2 px-10 transition-all duration-300 rounded  hover:bg-bluePrimary "
                >
                  Add To Cart
                </button>

                <button
                  onClick={onOpenPDFModal}
                  className="bg-bluePrimary text-white py-2 px-10 transition-all duration-300 rounded  hover:bg-yellowPrimary ml-3"
                >
                  Read Book
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {content}
      {isModalOpen && (
        <PDFViewerModal
          isOpen={isModalOpen}
          pdfSrc={data?.sample_pdf_link}
          onClose={onClosePDFModal}
        />
      )}
    </>
  );
};

export default BookDetailsData;
