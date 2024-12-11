import CategoryCourses from "@/components/pages/AllCourses/categories/CategoryCourses";

export const metadata = {
  title: "Course Category",
};
const CategoryPage = ({ params }) => {
  const id = params?.id;

  return (
    <div>
      <CategoryCourses id={id} />
    </div>
  );
};

export default CategoryPage;
