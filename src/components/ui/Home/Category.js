"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon1 from "../../../assets/images/learn-icon.svg";
import icon2 from "../../../assets/images/icon2.png";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";
import EmptyContent from "@/components/Loader/EmptyContent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const Category = () => {
  const { data, isError, isLoading } = useGetAllCategoriesQuery();
  const categoriesData = data?.categories;
  // (categoriesData)

  const breakpoints = {
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    576: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    786: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
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
        {" "}
        <Link href={`/courses/category/${item?._id}`} className=" ">
          <div className="bg-bluePrimary bg-opacity-50  rounded-lg shadow-lg border cursor-pointer  hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110 hover:rounded-lg">
            <div className="text-center flex justify-center items-center">
              <div className="pt-4 h-52">
                <Image
                  src={item?.icon}
                  alt="img"
                  width={90}
                  height={20}
                  className=" pt-5"
                />
                <h2 className="py-5 font-semibold ">{item?.title} </h2>
              </div>
              {/* <h2 className="py-5 font-semibold ">{item?.icon} </h2> */}
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <div className=" px-14 py-20 ">
      <div className="lg:flex items-center justify-between my-4">
        <div>
          <h2 className="lg:text-3xl md:text-2xl font-semibold">
            Choose Your Favourite Course
          </h2>
          <h5 className="lg:text-xl py-4 mb-3">
            দেশসেরা ইন্সট্রাক্টরদের সেরা সব কোর্স এখন এক প্ল্যাটফর্মে।
          </h5>
        </div>

        {/* <button className="bg-transparent border-0 ">
          <Link
            href="/"
            className="bg-transparent text-cyanPrimary py-4 px-4 transition-all font-semibold border border-cyan-900 duration-300 rounded hover:bg-yellowPrimary hover:border-none hover:text-white"
          >
            সকল ক্যাটাগরি দেখুন
          </Link>{" "}
        </button> */}
      </div>

      <div className="">
        <Swiper
          // pagination={{
          //   dynamicBullets: false,
          // }}
          // modules={[Pagination]}
          breakpoints={breakpoints}
          className="mySwiper"
        >
          {content}
        </Swiper>

        {/* <Link href="/" className="relative  overflow-hidden  ">
          <div className="bg-white rounded shadow-lg">
            <div className="text-center">
              <div className="flex justify-center pt-5">
                <Image src={icon1} alt="icon" width={120} height={200} />
              </div>
              <h2 className="py-5 font-semibold ">প্রাইমারী চাকরী প্রস্ততি </h2>
            </div>
            <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-blue-900 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 hover:rounded"></div>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Category;
