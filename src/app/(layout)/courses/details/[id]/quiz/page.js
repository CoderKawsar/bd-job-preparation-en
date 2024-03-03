import CourseAllExams from "@/components/pages/AllCourses/CourseAllExams";

export const metadata = { 
    title: "কোর্স পরিক্ষা ",
  };

const CourseQuizPage = ({params}) => {
    const id = params?.id;
    return (
        <div> 
            <CourseAllExams course_id={id}/>
        </div>
    );
};

export default CourseQuizPage;