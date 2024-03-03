
import CourseSubscribe from "@/components/pages/AllCourses/CourseSubscribe";

export const metadata = { 
    title: "কোর্স সাবস্ক্রাইব ",
  };

const SubscribePage = ({params}) => {
    const id = params?.id;
    return (
        <div>
            <CourseSubscribe course_id={id}/>
        </div>
    );
};

export default SubscribePage;