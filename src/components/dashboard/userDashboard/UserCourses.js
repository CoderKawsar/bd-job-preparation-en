import EmptyContent from "@/components/Loader/EmptyContent";
import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetMyCourseSubscriptionsHistoryQuery } from "@/redux/api/courseApi";
import Link from "next/link";

///subscription-histories//my-subscription-histories
// /courses-playlists/course/:course_id
const UserCourses = () => {
  const { data, isLoading, isError } =
    useGetMyCourseSubscriptionsHistoryQuery();

  const courseSubs = data?.courseSubscription;

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div>
        <h5 className="font-bold bg-green-600  text-white py-3 px-4 rounded text-lg">
          No course bought yet
        </h5>
      </div>
    );
  }

  if (!isLoading && !isError && courseSubs?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && courseSubs?.length > 0) {
    content = courseSubs?.map((item) => (
      <div
        key={item?._id}
        className="w-80 h-auto shadow-xl border rounded-lg border-lime-500"
      >
        <div className="flex justify-between items-center">
          <p className="p-2 m-2 bg-purple-200 rounded-lg">
            {item?.course_id?.sub_category_id?.category_id?.title}
          </p>
          <p className="p-2 m-2 bg-orange-200 rounded-lg">
            {item?.course_id?.sub_category_id?.title}
          </p>
        </div>

        <img src={item?.course_id?.banner} alt="course" />

        <div className="card-body text-center">
          <h2 className="font-bold text-lg"> {item?.course_id?.title}</h2>

          <Timer expireDate={item?.expire_date} />

          {item?.course_id?.routine ? (
            <a
              href={item?.course_id?.routine}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <button className="bg-blue-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full">
                View routine
              </button>
            </a>
          ) : (
            <p className="text-orange-600">Routine coming soon</p>
          )}

          <hr></hr>

          <div className="card-actions justify-center">
            <Link
              href={`/user/mycourses/details/${item?.course_id?._id}`}
              className="text-lg text-bluePrimary hover:text-green-500 cursor-pointer"
            >
              Start Course
            </Link>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="flex items-center justify-center">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-10">
        {content}
      </div>
    </div>
  );
};

export default UserCourses;
