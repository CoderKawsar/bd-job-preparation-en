"use client";

import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BookSectionCard from "../ui/Home/course/BookSectionCard";

const Books = ({ books, isLoading, isError }) => {
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
      slidesPerView: 3,
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

  if (!isLoading && !isError && books?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent content="Book" />
      </>
    );
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books?.map((item) => (
      <SwiperSlide key={item?._id}>
        <BookSectionCard item={item} />
      </SwiperSlide>
    ));
  }

  return (
    <div className="px-14 py-8 ">
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

export default Books;
