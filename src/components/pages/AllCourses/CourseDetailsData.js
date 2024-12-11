import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Image from "next/image";
import CourseExams from "./CourseExams";
import CourseSubscriptions from "./CourseSubscriptions";
import CourseBooks from "./CourseBooks";

const CourseDetailsData = ({ data, isError, isLoading }) => {
  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && data) {
    content = (
      <div>
        <div className="md:pr-10">
          <div className="space-y-4 mb-10 grid grid-cols-1 gap-2 ">
            <h2 className="text-xl font-bold mt-5 mx-12 text-center text-blue-600">
              {data?.title} Welcome from your course instructor: {data?.author}{" "}
              and "BD Job Preparation" 🎉
            </h2>

            <div className="w-96 mx-auto">
              <div className="flex justify-center gap-x-4">
                <p
                  className={`text-bluePrimary ${
                    data?.sub_category_id?.tilte ? "pr-10" : ""
                  } font-semibold`}
                >
                  Category:
                  <span className="text-black font-medium">
                    {" "}
                    {data?.sub_category_id?.category_id?.title ||
                      data?.category_id?.title}
                  </span>
                </p>
                {data?.sub_category_id?.title && (
                  <p className="text-yellowPrimary">
                    Sub-Category:{" "}
                    <span className="text-black font-medium">
                      {data?.sub_category_id?.title}
                    </span>
                  </p>
                )}
              </div>

              <Image
                className="rounded w-full"
                src={data?.banner}
                alt="course"
                width={600}
                height={50}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 items-center text-center gap-8 mx-10">
              <div>
                <div className="drop-shadow-xl text-center bg-indigo-300 rounded p-5 mt-8">
                  <a href={data?.study_materials} target="_blank">
                    <img
                      className="w-24 mx-auto pb-3"
                      src="https://i.ibb.co/59y8Vxz/395068.png"
                      alt="study materials"
                    />
                    <p className="text-base md:text-lg font-bold">
                      Study Materials
                    </p>
                  </a>
                </div>
              </div>
              <div>
                <a href={data?.syllabus} target="_blank">
                  <div className="drop-shadow-xl text-center bg-lime-400 rounded p-5 mt-8">
                    <img
                      className="w-24 mx-auto pb-3"
                      src="https://i.ibb.co/VgkXyBZ/762677.png"
                      alt="syllabus"
                    />
                    <p className="text-base md:text-lg font-bold">
                      View Syllabus
                    </p>
                  </div>
                </a>
              </div>
              <div>
                <a href="https://forms.gle/3vjsXVuQi2vUomHX7" target="_blank">
                  <div className="drop-shadow-xl text-center bg-green-400 rounded p-5 mt-8">
                    <img
                      className="w-24 mx-auto pb-3"
                      src="https://i.ibb.co/vq6N0mw/8577594.png"
                      alt="free seminar"
                    />
                    <p className="text-base md:text-lg font-bold">
                      Attend Free Seminar
                    </p>
                  </div>
                </a>
              </div>

              <div>
                <div className="drop-shadow-xl text-center bg-cyan-400 rounded p-5 mt-8">
                  <img
                    className="w-24 mx-auto pb-3"
                    src="https://i.ibb.co/zZD7Pbw/5560586.png"
                    alt="membership"
                  />
                  <p className="text-base md:text-lg font-bold">
                    Membership Type:
                    {data?.membership_type === "1" ? " Paid" : " Free"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-16 text-justify">
          <p dangerouslySetInnerHTML={{ __html: data?.description }}></p>
        </div>

        <div className="md:pl-10 mt-4 md:mt-0">
          <div className=" bg-white rounded border py-10 px-5 mt-4 mx-5">
            {data && <CourseSubscriptions course_id={data?._id} />}
          </div>

          <div className="bg-white rounded border py-10 px-5  m-5">
            <h2 className="text-xl font-bold mb-4">Exams of this course:</h2>
            {data && <CourseExams course_id={data?._id} />}
          </div>

          <div className="bg-white rounded border py-10 px-5  m-5">
            <h2 className="text-xl font-bold mb-4">Books of this course :</h2>
            {data && <CourseBooks course_id={data?._id} />}
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default CourseDetailsData;
