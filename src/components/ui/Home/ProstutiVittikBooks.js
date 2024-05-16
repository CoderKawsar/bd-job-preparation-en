"use client";

import Link from "next/link";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";
import EmptyContent from "@/components/Loader/EmptyContent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useGetAllUniqueSubcategoriesQuery } from "@/redux/api/subcategoryApi";

const ProstutiVittikBooks = () => {
  const {
    data: subCategories,
    isError,
    isLoading,
  } = useGetAllUniqueSubcategoriesQuery();

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

  if (!isLoading && !isError && subCategories?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && subCategories?.length > 0) {
    content = subCategories?.map((item, index) => (
      <SwiperSlide key={index}>
        <div className=" bg-opacity-50  rounded-lg shadow-lg border border-black bg-gray-200  transition-all transform duration-300 delay-200 hover:bg-gray-300 hover:rounded-lg">
          <div className="flex justify-center items-center bg-bluePrimary rounded-t-md">
            {/* category title */}
            <h2 className="py-5 font-semibold text-white text-3xl text-center drop-shadow-md">
              {item}{" "}
            </h2>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-center border-r border-black py-2">সফট কপি</p>
            <p className="text-center py-2">প্রিন্ট কপি</p>
          </div>
          <div className={`w-full bg-yellowPrimary text-center rounded-b-md`}>
            {/* link to the category, since sub-category not available for this category */}

            <Link
              href={`/books/prostuti/${item}`}
              className={`block w-full py-2 text-white transition-all duration-300 hover:bg-bluePrimary rounded-b-md`}
            >
              কিনুন
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ));
  }

  return (
    <div className="px-14 pt-4">
      <div className="mt-4 mb-2">
        <h4 className="text-xl font-semibold">৩&#41; প্রস্তুতি-ভিত্তিকঃ</h4>
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

export default ProstutiVittikBooks;
