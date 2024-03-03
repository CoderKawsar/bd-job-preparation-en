import CourseDetails from "@/components/pages/AllCourses/CourseDetails"

export const metadata = { 
    title: "কোর্স  ডিটেইলস ",
  };

const CourseDetailsPage = ({params}) => {
    const {id} = params;
  return (
    <div>
    
    <CourseDetails id={id}/>
    
    </div>
  )
}

export default CourseDetailsPage