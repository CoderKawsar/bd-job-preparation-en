import CategoryCourses from "@/components/pages/AllCourses/categories/CategoryCourses";

export const metadata = {
  title: "কোর্স ক্যাটাগরি",
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
