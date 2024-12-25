"use client";
import Image from "next/image";
import avatar from "../../../../assets/images/img1.png";
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useState } from "react";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";
import decryptLink from "@/helpers/decryptLink";

const BookSectionCard = ({ item, onOpenPDFModal }) => {
  const { books: cartItems } = useSelector((state) => state.cart);

  const [showPDFModal, setShowPDFModal] = useState(false);
  const openPDFModal = () => {
    setShowPDFModal(true);
  };

  const closePDFModal = () => {
    setShowPDFModal(false);
  };
  const dispatch = useDispatch();

  const handleAddBook = (item) => {
    const existingBook = cartItems?.find((book) => book?._id === item?._id);

    console.log("data", existingBook);

    if (existingBook) {
      toast.error("বইটি ইতিমধ্যে ঝুড়িতে যোগ করা হয়েছে");
    } else {
      dispatch(addToCart(item));
      toast.success("বইটি ঝুড়িতে যোগ হয়েছে সফলভাবে");
    }
  };

  return (
    <>
      <div className="card w-[350px]   shadow-xl cursor-pointer transition ease-in-out delay-150  duration-300 rounded bg-white">
        <div>
          <button
            onClick={onOpenPDFModal}
            className="text-bluePrimary cursor-pointer"
          >
            Read
          </button>
        </div>

        <figure className="relative">
          <Image
            className="rounded w-full h-72"
            src={item?.cover_page}
            alt="course"
            width={400}
            height={100}
          />

          <p className="absolute top-0 left-0 bg-yellowPrimary text-white p-1  ">
            {item?.course_id[0]?.sub_category_id?.category_id?.title}
          </p>
          <p className="absolute top-0 right-0 bg-bluePrimary text-white p-1 ">
            {" "}
            {item?.course_id[0]?.sub_category_id?.title}
          </p>
        </figure>

        <div className="cursor-pointer p-4 hover:bg-white hover:rounded hover:text-cyanPrimary">
          <h2 className="card-title  border px-4 py-2  bg-bluePrimary  ring-1 border-white absolute top-[220px] text-white text-[16px] border-b-0 rounded">
            {item?.title}
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Image
                src={avatar}
                width={40}
                height={50}
                alt="avatar"
                className="rounded-full"
              />
              <span className="pl-2 text-cyanPrimary hover:text-cyanPrimary">
                {item?.writer}
              </span>
            </div>
            <div className="flex items-center">
              <PiNotebookBold />{" "}
              <span className="pl-1 text-cyanPrimary font-semibold">
                {" "}
                {item?.format}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="py-2"> {item?.description?.slice(0, 50)}</p>
              <Link
                className="text-bluePrimary pl-5"
                href={`/books/details/${item?._id}`}
              >
                Read More
              </Link>
            </div>
            <div></div>
          </div>

          <hr />
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm font-semibold py-3">
              {" "}
              Price: <del className="text-gray-400  ">
                {" "}
                -{item?.price}{" "}
              </del>{" "}
              <span className="font-bold pl-2">{item?.discount_price}</span> Tk
            </p>
            {item?.discount_price == 0 ? (
              <button
                onClick={openPDFModal}
                className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary "
              >
                Read
              </button>
            ) : (
              <button
                onClick={() => handleAddBook(item)}
                className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary "
              >
                Add to Cart
              </button>
            )}
          </div>
          {cartItems?.find((book) => book?._id === item?._id) ? (
            <div className="text-center my-3">
              <Link href="/cart">
                <button className="bg-bluePrimary hover:bg-green-600 text-white py-2 px-4 transition-all duration-300 rounded text-center">
                  Watch Cart
                </button>
              </Link>
            </div>
          ) : (
            <> </>
          )}
        </div>
        {showPDFModal && (
          <PDFViewerModal
            isOpen={showPDFModal}
            pdfSrc={item?.pdf_link ? decryptLink(item?.pdf_link) : ""}
            onClose={closePDFModal}
          />
        )}
      </div>
    </>
  );
};

export default BookSectionCard;
