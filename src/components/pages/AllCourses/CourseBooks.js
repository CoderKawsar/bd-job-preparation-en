import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Books from "@/components/shared/Books";
import { useGetCourseBooksQuery } from "@/redux/api/booksApi";

function CourseBooks({ course_id }) {
  const { data, isLoading, isError } = useGetCourseBooksQuery({
    course_id,
    args: { limit: 40 },
  });
  const books = data?.books;

  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = (
      <h5 className="font-semibold bg-green-600 text-white p-3 rounded text-md">
        এই কোর্সে আপাতত কোনো বই নেই।
      </h5>
    );
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = <Books books={books} isLoading={isLoading} isError={isError} />;
  }

  return <>{content}</>;
}

export default CourseBooks;
