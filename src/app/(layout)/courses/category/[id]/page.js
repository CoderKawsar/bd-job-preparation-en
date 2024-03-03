import Categories from "@/components/pages/AllCourses/categories/Categories";

export const metadata = {
  title:"কোর্স ক্যাটাগরি"
}
const CategoryPage = ({ params }) => {
  const id = params?.id;

  return (
    <div>
      <Categories id={id} />
    </div>
  );
};

export default CategoryPage;
