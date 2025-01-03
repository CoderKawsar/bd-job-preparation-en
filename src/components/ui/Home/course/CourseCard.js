import Image from "next/image";
import Link from "next/link";
import { GiTeacher } from "react-icons/gi";

const CourseCard = ({ item }) => {
  const buyOrStartLink =
    item?.membership_type === "1"
      ? `/courses/details/${item?._id}/subscribe`
      : `/user/mycourses/details/${item?._id}`;
  return (
    <>
      {/* hover:-translate-y-1 hover:scale-110 */}
      <div className="card shadow-lg my-6 transition ease-in-out delay-150  duration-300 rounded bg-white ">
        <figure className="relative ">
          <Image
            className="rounded h-48 "
            src={item?.banner}
            alt={item?.title}
            width={400}
            height={50}
          />
          {/* z-0-rotate-45 z-10 */}
          <p className="absolute top-0 left-0 bg-yellowPrimary text-white p-1  ">
            {item?.sub_category_id?.category_id?.title}
          </p>
          <Link
            href={`/courses/subcategory/${item?.id}`}
            className="absolute top-0 right-0 bg-bluePrimary text-white p-1 "
          >
            {" "}
            {item?.sub_category_id?.title}
          </Link>
        </figure>

        <div className="p-4  hover:bg-white hover:rounded hover:text-cyanPrimary">
          <h2 className="card-title  border px-4 py-2  bg-bluePrimary  ring-1 border-white absolute top-[160px] text-white text-[16px] border-b-0 rounded">
            {item?.title}
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <GiTeacher className="text-3xl text-lime-500" />
              <span className="pl-2 text-cyanPrimary hover:text-cyanPrimary">
                {item?.author}
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-sm font-semibold py-3 ">
                {" "}
                <span className="pr-5">Memebership Type</span>{" "}
                <span
                  className={`bg-blue-200 font-bold px-2 py-1 rounded ${
                    item?.membership_type === "1" ? "text-paid" : "text-free"
                  }`}
                >
                  {item?.membership_type === "1" ? "Paid" : "Free"}
                </span>
              </p>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: `${item?.description.substring(0, 50)}...`,
            }}
          ></p>

          <div className="py-3">
            {/* {item?.description}{" "} */}
            <div className="flex justify-between">
              <Link
                href={`/courses/details/${item?._id}`}
                className="text-fuchsia-600"
              >
                Read More
              </Link>{" "}
              <Link
                href={`/courses/details/${item?._id}/quiz`}
                className="text-red-500 "
              >
                Give Exam
              </Link>{" "}
            </div>
          </div>
          <hr />
          <div className="text-center mt-6 mb-3 ">
            <Link
              href={buyOrStartLink}
              className="bg-yellowPrimary text-white py-4 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary"
            >
              {item?.membership_type === "0" ? "Start Course" : "Buy Course"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
