"use client";
import Link from "next/link";
import CourseCard from "./course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import EmptyContent from "@/components/Loader/EmptyContent";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const Courses = () => {
  const { data, isError, isLoading } = useGetAllCoursesQuery();

  const coursesData = data?.courses?.data;
  const filteredCourses = coursesData?.filter((item) => item?.membership_type === "1");

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
  }




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

  if (!isLoading && !isError && filteredCourses?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && filteredCourses?.length > 0) {
    content = filteredCourses?.map((item) => <SwiperSlide key={item?._id}><CourseCard item={item} /></SwiperSlide>);
  }

  return (
    <div className="lg:px-14 px-5">
      <div className="flex gap-5 py-2">
        <h2 className="text-2xl font-bold px-2  rounded">ক্যারিয়ার ট্র্যাক কোর্স</h2>
        <Link href="/courses" className=" bg-bluePrimary hover:bg-cyanPrimary w-44 text-white px-7 py-3 rounded transition-all duration-500 delay-200">
          সকল কোর্স দেখুন
        </Link>
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

export default Courses;
