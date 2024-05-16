"use client";
import Link from "next/link";
import FreeCourseCard1 from "./course/FreeCourseCard1";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";
import EmptyContent from "@/components/Loader/EmptyContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import CourseCard from "./course/CourseCard";

const FreeCourse = () => {
  const { data, isError, isLoading } = useGetAllCoursesQuery();

  const coursesData = data?.courses?.data;
  const filteredCourses = coursesData?.filter(
    (item) => item?.membership_type === "0"
  );

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

  if (!isLoading && !isError && filteredCourses?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && filteredCourses?.length > 0) {
    content = filteredCourses?.map((item) => (
      <SwiperSlide key={item?._id}>
        <CourseCard item={item} />
      </SwiperSlide>
    ));
  }

  return (
    <div>
      <div className="lg:px-14  px-3 pt-6">
        <div className="flex gap-5 pb-4">
          <h2 className="text-2xl font-bold px-2  rounded ">ফ্রী কোর্সসমূহ</h2>
          <Link
            href="/courses"
            className=" bg-bluePrimary hover:bg-cyanPrimary w-44 text-white px-7 py-3 rounded transition-all duration-500 delay-200"
          >
            সব কোর্স দেখুন
          </Link>
        </div>

        <div>
          <Swiper
            // pagination={{
            //   type: 'progressbar',
            // }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={breakpoints}
            className="mySwiper"
          >
            {content}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FreeCourse;
