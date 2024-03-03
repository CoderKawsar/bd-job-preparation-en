"use client";
import Image from "next/image";
import avatar from "../../../../assets/images/img1.png";
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { isLoggedIn } from "@/services/auth.service";
import { useState } from "react";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";

const BookSectionCard = ({ item, onOpenPDFModal }) => {
  const {books:cartItems} = useSelector((state) => state.cart);
 
 
  

  const [showPDFModal, setShowPDFModal] = useState(false);
  const openPDFModal = () => {
    setShowPDFModal(true);
  };

  const closePDFModal = () => {
    setShowPDFModal(false);
  };
  const dispatch = useDispatch();

  // const handleAddBook = (item) => {
  //   dispatch(addToCart(item));
  //   toast.success("বইটি ঝুড়িতে যোগ হয়েছে  সফলভাবে");
  // };
  const handleAddBook = (item) => {
    const existingBook = cartItems?.find((book) => book._id === item._id);
  
    if (existingBook) {
      toast.error('বইটি ইতিমধ্যে ঝুড়িতে যোগ করা হয়েছে');
    } else {
      dispatch(addToCart(item));
      toast.success('বইটি ঝুড়িতে যোগ হয়েছে সফলভাবে');
    }
  };
  // const [addToCart] = useAddToCartMutation();
  // const userLoggedIn = isLoggedIn();
  //  const dispatch = useDispatch();

  // const handleAddBook = async (item) => {
  //   if (!userLoggedIn) {
  //     return toast.error("Please signin to buy a book");
  //   }

  //   const res = await addToCart({book_id: item?._id, quantity: 1 });

  //   if (res?.data?.quantity && res.data.quantity > 1) {
  //     toast.success('Book has already been added to your cart. Please check your cart.');
  //   } else {
  //     toast.success('Book added to your cart successfully.');
  //   }

  // }

  return (
    <>
      <div className="card w-[350px]   shadow-xl cursor-pointer transition ease-in-out delay-150  duration-300 rounded bg-white">
        <div>
          <button
            onClick={onOpenPDFModal}
            className="text-bluePrimary cursor-pointer"
          >
            বইটি একটু পড়ুন
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

          {/* <p  className="absolute top-0 left-0 bg-yellowPrimary text-white p-1 rounded-xl ">{item?.course_id?.sub_category_id?.category_id?.title}</p>
          <p className="absolute top-0 right-0 bg-bluePrimary text-white p-1 rounded-xl"> {item?.course_id?.sub_category_id?.title}</p> */}

           <p  className="absolute top-0 left-0 bg-yellowPrimary text-white p-1  ">{item?.course_id[0]?.sub_category_id?.category_id?.title}</p>
          <p className="absolute top-0 right-0 bg-bluePrimary text-white p-1 "> {item?.course_id[0]?.sub_category_id?.title}</p>

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
              <p
                className="py-2"
              
              > {
                item?.description?.slice(0,50)
             }</p>
              <Link
                className="text-bluePrimary pl-5"
                href={`/books/details/${item?._id}`}
              >
                আর দেখুন
              </Link>
            </div>
            <div>
              {/* <p>বইটি পড়ুন  <iframe src="https://drive.google.com/file/d/178gMk281mQtMJrVHtR7nytcphA_uoIDk/preview" width="640" height="480" allow="autoplay"></iframe></p> */}
            </div>
          </div>

          <hr />
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm font-semibold py-3">
              {" "}
              কোর্সের মূল্যঃ{" "}
              <del className="text-gray-400  "> -{item?.price} </del>{" "}
              <span className="font-bold pl-2">{item?.discount_price}</span> Tk
            </p>
            <button
              onClick={() => handleAddBook(item)}
              className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary "
            >
              ঝুড়িতে যোগ করুন
            </button>
          </div>
          {/* <div className=" card-actions justify-start ">
            <button className="text-black transition-all duration-300 rounded hover:text-yellowPrimary font-medium underline">
              বইটি কিনুন
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BookSectionCard;
