import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";

import ExamLists from "./ExamLists";

function CourseExams({ course_id }) {
  const {
    data: dataExams,
    isError,
    isLoading,
  } = useGetAllExamsQuery({
    course_id: course_id,
  });

  const exams = dataExams?.exams?.data;

  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && exams?.length === 0) {
    content = (
      <h5 className="font-semibold bg-green-600 text-white p-3 rounded text-md">
        No exam found on this course
      </h5>
    );
  }

  if (!isLoading && !isError && exams?.length > 0) {
    content = <ExamLists exams={exams} />;
  }

  return <>{content}</>;
}

export default CourseExams;
