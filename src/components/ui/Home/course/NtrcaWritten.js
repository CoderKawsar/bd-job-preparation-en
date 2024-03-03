"use client";
import Link from "next/link";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,  } from 'swiper/modules';
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";
import CourseCard from "./CourseCard";

const NtrcaWritten = () => {
  const { data, isError, isLoading } = useGetAllCoursesQuery({
    // sub_category_id:"প্রিলিমিনারি"
  });

  const filteredCourses = data?.courses?.data;
//   const filteredCourses = coursesData?.filter((item) => item?.membership_type === "1");

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
        <InitialLoader/>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error/>;
  }

  if (!isLoading && !isError && filteredCourses?.length === 0) {
    content = (
      <>
        {" "}
       <EmptyContent/>
      </>
    );
  }

  if (!isLoading && !isError && filteredCourses?.length > 0) {
    content = filteredCourses?.map((item) => <SwiperSlide key={item?._id}><CourseCard  item={item} /></SwiperSlide>);
  }

  return (
    <div className="px-14 py-10">
      <div className="flex gap-5 py-10">
        <h2 className="text-2xl font-bold px-2  rounded">সকল নিবন্ধান লিখিত কোর্স</h2>
        <Link href="/courses" className="mb-5 bg-bluePrimary hover:bg-cyanPrimary w-44 text-white px-7 py-3 rounded transition-all duration-500 delay-200">
          সব কোর্স দেখুন
        </Link>
      </div>
      
     
      <div className="">
      <Swiper
       
        navigation={true}
        modules={[Pagination, Navigation]}
        
        breakpoints= {breakpoints}
        className="mySwiper"
      >
{content}
      </Swiper>
        
      
        </div>
    </div>
  );
};

export default NtrcaWritten;
