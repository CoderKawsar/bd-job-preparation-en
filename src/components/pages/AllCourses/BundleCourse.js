import Loading from "@/app/loading";
import { useGetSingleCourseQuery } from "@/redux/api/courseApi";
import Image from "next/image";

export default function BundleCourse({ course_id, cost }) {
  const { data: singleCourse, isLoading } = useGetSingleCourseQuery(course_id);

  if (isLoading) return <Loading />;
  else
    return (
      <div className="flex">
        {/* <h2 className="text-2xl font-bold py-4">{i+1}</h2> */}
        <div className="border rounded">
          <div className="flex items-center">
            <div>
              <Image
                src={singleCourse?.banner}
                alt={singleCourse?.title}
                height={20}
                width={200}
              />
            </div>
            <div className="px-2">
              <h2 className="text-2xl font-bold py-2">{singleCourse?.title}</h2>
              <h5 className="text-yellowPrimary text-lg">
                {singleCourse?.author}
              </h5>
              <p> প্রতিটি কোর্সের মূল্য {cost} টাকা</p>
            </div>
          </div>
        </div>
      </div>
    );
}
