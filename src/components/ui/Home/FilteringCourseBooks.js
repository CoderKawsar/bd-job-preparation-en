'use client'

import { useGetSingleSubCategoryQuery } from "@/redux/api/subcategoryApi";
import { useState } from "react";
import SubCategoryCourses from "./course/SubCategoryCourses";
import SubCategoryBooks from "./SubCategoryBooks";
import Link from "next/link";

const FilteringCourseBooks = ({ sub_category_id }) => {
  const [showCourses, setShowCourses] = useState(true);



  const { data: subCategory } = useGetSingleSubCategoryQuery(sub_category_id);
  // (data)
  return (
    <>
      <div className="flex gap-5 lg:mx-14 items-center sm:mt-14 lg:mt-24 ">
        <h2 className="lg:text-2xl font-bold px-2  rounded">{subCategory?.category_id?.title}  {subCategory?.title} </h2>

        <button onClick={() => setShowCourses(true)} className=" text-bluePrimary hover:text-yellowPrimary    rounded transition-all duration-500 delay-200 font-bold lg:text-xl ">
          সব  কোর্স দেখুন
        </button>
        <button onClick={() => setShowCourses(false)} className="  text-bluePrimary hover:text-yellowPrimary    rounded transition-all duration-500 delay-200 font-bold lg:text-xl">
          সব বই দেখুন
        </button>
      </div>
      {showCourses ? <SubCategoryCourses sub_category_id={sub_category_id} /> : <SubCategoryBooks sub_category_id={sub_category_id} />}
      <div className="flex justify-end">
        <Link href={`/courses/category/subcategory/courseBundle/${sub_category_id}`} className=" bg-bluePrimary text-white hover:bg-yellowPrimary    rounded transition-all duration-500 delay-200 font-bold text-xl border px-10 py-3 lg:mb-0 mb-5">

          সব কোর্স একসাথে কিনুন
        </Link>

      </div>
    </>
  );
};

export default FilteringCourseBooks;