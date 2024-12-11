import CourseSubscribe from "@/components/pages/AllCourses/CourseSubscribe";

export const metadata = {
  title: "Course Subscribe",
};

const SubscribePage = ({ params }) => {
  const id = params?.id;
  return (
    <div>
      <CourseSubscribe course_id={id} />
    </div>
  );
};

export default SubscribePage;
