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
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi";

const SubjectBooks = () => {
  const { data, isError, isLoading } = useGetAllSubjectsQuery();
  const subjectsData = data?.subjects;

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

  if (!isLoading && !isError && subjectsData?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && subjectsData?.length > 0) {
    content = subjectsData?.map((item) => (
      <SwiperSlide key={item?._id}>
        <div className=" bg-opacity-50  rounded-lg shadow-lg border border-black bg-gray-200  transition-all transform duration-300 delay-200 hover:bg-gray-300 hover:rounded-lg">
          <div className="flex justify-center items-center bg-bluePrimary rounded-t-md">
            {/* category title */}
            <h2 className="py-5 font-semibold text-white text-3xl text-center drop-shadow-md">
              {item?.title}{" "}
            </h2>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-center border-r border-black py-2">PDF Book</p>
            <p className="text-center py-2">Hard Copy</p>
          </div>
          <div className={`w-full bg-yellowPrimary text-center rounded-b-md`}>
            {/* link to the category, since sub-category not available for this category */}

            <Link
              href={`/books/subject/${item?._id}`}
              className={`block w-full py-2 text-white transition-all duration-300 hover:bg-bluePrimary rounded-b-md`}
            >
              Buy
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ));
  }

  return (
    <div className="px-14 pt-4">
      <div className="mt-4 mb-2">
        <h4 className="text-xl font-semibold">2&#41; By Subject:</h4>
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

export default SubjectBooks;
