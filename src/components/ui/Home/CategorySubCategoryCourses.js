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

const CategorySubCategoryCourses = () => {
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
          <div className="flex justify-center items-center bg-bluePrimary rounded-t-md">
            {/* category title */}
            <h2 className="py-5 font-semibold text-white text-3xl text-center drop-shadow-md">
              {item?.title}{" "}
            </h2>
          </div>
          {/* sub categories work starts here */}
          <div
            className={`${
              item.subCategories && item.subCategories.length > 0
                ? `grid-cols-${item.subCategories.length} grid justify-between`
                : ""
            }`}
          >
            {/* ================= Showing sub-categories ============== */}
            {item?.subCategories &&
              item?.subCategories?.length > 0 &&
              item?.subCategories?.map((subCategory, index, array) => (
                <div className="w-full" key={subCategory?._id}>
                  <div
                    className={`text-center flex flex-col py-2 ${
                      index === 0 && "border-l-0"
                    } border-l  border-t border-black`}
                  >
                    {subCategory?.title}
                  </div>
                  <div
                    className={`w-full text-center ${
                      index === 0 && "border-l-0"
                    } border-l border-black`}
                  >
                    <Link
                      href={`/courses/subcategory/${subCategory?._id}`}
                      className={`inline-block w-full py-2 bg-yellowPrimary text-white transition-all duration-300 ${
                        array.length === index + 1 ? "rounded-br-md" : ""
                      }  hover:bg-bluePrimary ${
                        index === 0 && "rounded-bl-md"
                      }`}
                    >
                      Enroll
                    </Link>
                  </div>
                </div>
              ))}

            {/* ===========if there is no sub-category to this category ======== */}
            {!item?.subCategories ||
              (!item?.subCategories?.length && (
                <div>
                  {/* if no sub category found then show only tick icon in place of sub-categories */}
                  <p className="flex justify-center items-center py-2 border-t border-black">
                    &nbsp;
                    <FaCheck />
                    &nbsp;
                  </p>
                  <div
                    className={`w-full bg-yellowPrimary text-center rounded-b-md`}
                  >
                    {/* link to the category, since sub-category not available for this category */}
                    <Link
                      href={`/courses/category/${item?._id}`}
                      className={`block w-full py-2 text-white transition-all duration-300 hover:bg-bluePrimary  rounded-b-md`}
                    >
                      Enroll
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </SwiperSlide>
    ));
  }

  return (
    <div className="px-14 py-4 mt-16">
      <div className="lg:flex items-center justify-between my-4">
        <div>
          {/* <h5 className="lg:text-xl py-4 mb-3">
            দেশসেরা ইন্সট্রাক্টরদের সেরা সব কোর্স এখন এক প্ল্যাটফর্মে।
          </h5> */}
          <h2 className="lg:text-3xl md:text-2xl font-semibold mb-2 font-raleway">
            Choose Your Favourite Course:
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

export default CategorySubCategoryCourses;
