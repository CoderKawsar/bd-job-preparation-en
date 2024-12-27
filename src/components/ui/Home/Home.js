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
import CategorySubCategoryCourses from "./CategorySubCategoryCourses";
import CategoryBooks from "./CategoryBooks";
import CategorySubCategoryExams from "./CategorySubCategoryExams";
import SubjectBooks from "./SubjectBooks";
import ProstutiVittikBooks from "./ProstutiVittikBooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  // const {data} = useGetAllCoursesQuery({
  //   title:"Course title here"
  // });
  // (data)
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="">
      <Hero />
      {/* <Category /> */}
      <CategorySubCategoryCourses />
      <CategoryBooks />
      <SubjectBooks />
      <ProstutiVittikBooks />
      <CategorySubCategoryExams />

      {/* <Courses /> */}
      {/* <FilteringCourseBooks sub_category_id={bcsPriliSubId} />
      <FilteringCourseBooks sub_category_id={bcsWrittenSubId} />
      <FilteringCourseBooks sub_category_id={bankPriliSubId} />
      <FilteringCourseBooks sub_category_id={bankWrittenSubId} />
      <FilteringCourseBooks sub_category_id={ntrcaPriliSubId} />
      <FilteringCourseBooks sub_category_id={ntrcaWrittenSubId} />
      <FilteringCourseBooks sub_category_id={primaryPriliSubId} /> */}

      <BookSection />
      <FreeCourse />

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
