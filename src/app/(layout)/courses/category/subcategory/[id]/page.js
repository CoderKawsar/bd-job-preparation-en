import SubCategory from "@/components/pages/AllCourses/SubCategory";

export const metadata = {
    title:"কোর্স সাব ক্যাটাগরি"
  }

const CourseSubCategoryPages = ({params}) => {
    const id = params?.id;
    
    return (
        <div>
         
            <SubCategory id={id}/>
        </div>
    );
};

export default CourseSubCategoryPages;