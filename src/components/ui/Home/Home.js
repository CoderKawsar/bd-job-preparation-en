"use client";
import Benefits from "./Benefits";
import BookSection from "./BookSection";
import FreeCourse from "./FreeCourse";
import FreeSeminar from "./FreeSeminar";
import Hero from "./Hero";
import HomeQuiz from "./HomeQuiz";
import ScrollToTopButton from "./ScrollToTopButton";
import SelectCarreer from "./SelectCarreer";
import Faq from "./Faq";
import {
  bankPriliSubId,
  bankWrittenSubId,
  bcsPriliSubId,
  bcsWrittenSubId,
  ntrcaPriliSubId,
  ntrcaWrittenSubId,
  primaryPriliSubId,
} from "@/utils/subCategoryId";
import FilteringCourseBooks from "./FilteringCourseBooks";
import CategorySubCategoryCourses from "./CategorySubCategoryCourses";
import CategoryBooks from "./CategoryBooks";
import CategorySubCategoryExams from "./CategorySubCategoryExams";

const HomePage = () => {
  // const {data} = useGetAllCoursesQuery({
  //   title:"Course title here"
  // });
  // (data)
  return (
    <div className="">
      <Hero />
      {/* <Category /> */}
      <CategorySubCategoryCourses />
      <CategoryBooks />
      <CategorySubCategoryExams />

      {/* <Courses /> */}
      <FilteringCourseBooks sub_category_id={bcsPriliSubId} />
      <FilteringCourseBooks sub_category_id={bcsWrittenSubId} />
      <FilteringCourseBooks sub_category_id={bankPriliSubId} />
      <FilteringCourseBooks sub_category_id={bankWrittenSubId} />
      <FilteringCourseBooks sub_category_id={ntrcaPriliSubId} />
      <FilteringCourseBooks sub_category_id={ntrcaWrittenSubId} />
      <FilteringCourseBooks sub_category_id={primaryPriliSubId} />

      <FreeCourse />
      <BookSection />
      <FreeSeminar />

      <Benefits />
      <Faq />
      <HomeQuiz />
      <SelectCarreer />
      <ScrollToTopButton />
    </div>
  );
};
export default HomePage;