import SubCategory from "@/components/pages/AllCourses/SubCategory";

export const metadata = {
  title: "Course Sub-category",
};

const CourseSubCategoryPages = ({ params }) => {
  const id = params?.id;

  return (
    <div>
      <SubCategory id={id} />
    </div>
  );
};

export default CourseSubCategoryPages;
