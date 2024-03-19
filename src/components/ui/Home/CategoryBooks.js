"use client";

import Link from "next/link";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";
import EmptyContent from "@/components/Loader/EmptyContent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaCheck } from "react-icons/fa6";

const CategoryBooks = () => {
  const { data, isError, isLoading } = useGetAllCategoriesQuery();
  const categoriesData = data?.categories;

  const breakpoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    786: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && categoriesData?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && categoriesData?.length > 0) {
    content = categoriesData?.map((item) => (
      <SwiperSlide key={item?._id}>
        <div className=" bg-opacity-50  rounded-lg shadow-lg border border-black bg-gray-200  transition-all transform duration-300 delay-200 hover:bg-gray-300 hover:rounded-lg">
          <div className="text-center flex justify-center items-center">
            <div className="pt-4">
              {/* category title */}
              <h2 className="py-5 font-semibold ">{item?.title} </h2>
            </div>
          </div>
          <p className="flex justify-center items-center py-2 border-y border-black">
            (প্রতি বইয়ের সাথে)
          </p>
          <div className="grid grid-cols-2">
            <p className="text-center border-r border-black py-2">সফট কপি</p>
            <p className="text-center py-2">প্রিন্ট কপি</p>
          </div>
          <div className={`w-full bg-yellowPrimary text-center rounded-b-md`}>
            {/* link to the category, since sub-category not available for this category */}
            <Link
              href={`/books/category/${item?._id}`}
              className={`block w-full py-2 text-white transition-all duration-300 hover:bg-bluePrimary  rounded-b-md`}
            >
              কিনুন
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ));
  }

  return (
    <div className=" px-14 py-20 ">
      <div className="lg:flex items-center justify-between my-4">
        <div>
          {/* <h5 className="lg:text-xl py-4 mb-3">
            দেশসেরা ইন্সট্রাক্টরদের সেরা সব কোর্স এখন এক প্ল্যাটফর্মে।
          </h5> */}
          <h2 className="lg:text-3xl md:text-2xl font-semibold mb-2">
            আমাদের বই সংগ্রহ করুনঃ
          </h2>
        </div>
      </div>

      <div className="">
        <Swiper
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={breakpoints}
          className="mySwiper"
        >
          {content}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryBooks;
