"use client";
import MemeberShipPlan from "@/components/ohters/MemeberShipPlan";
import Benefits from "./Benefits";
import BookSection from "./BookSection";
import Category from "./Category";
import Courses from "./Courses";
import FreeCourse from "./FreeCourse";
import FreeSeminar from "./FreeSeminar";
import Hero from "./Hero";
import HomeQuiz from "./HomeQuiz";
import ScrollToTopButton from "./ScrollToTopButton";
import SelectCarreer from "./SelectCarreer";
import Testing from "./Testing";
import Faq from "./Faq";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import BcsPrili from "./course/BcsPrili";
import BcsWritten from "./course/BcsWritten";
import BankPrili from "./course/BankPrili";
import BankWritten from "./course/BankWritten";
import NtrcaPrili from "./course/NtrcaPrili";
import NtrcaWritten from "./course/NtrcaWritten";
import PrimaryPrili from "./course/PrimaryPrili";
import SubCategoryCourses from "./course/SubCategoryCourses";
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
import Header from "@/components/shared/Header";

const HomePage = () => {
  // const {data} = useGetAllCoursesQuery({
  //   title:"Course title here"
  // });
  // (data)
  return (
    <div className="">
      <Hero />
      <Category />

      <Courses />
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
