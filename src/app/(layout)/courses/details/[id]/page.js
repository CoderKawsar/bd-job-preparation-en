import CourseDetails from "@/components/pages/AllCourses/CourseDetails";

export const metadata = {
  title: "Course Details",
};

const CourseDetailsPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <CourseDetails id={id} />
    </div>
  );
};

export default CourseDetailsPage;
