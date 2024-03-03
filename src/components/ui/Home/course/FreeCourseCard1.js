import Image from "next/image";
import avatar from "../../../../assets/images/img1.png";
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";

const FreeCourseCard1 = () => {
  return (
    <>
      
      <div className="card w-[350px]  shadow-xl cursor-pointer transition ease-in-out delay-150  duration-300 rounded bg-white">
        <figure className="relative">
          <Image
            className="rounded"
            src="https://i.ibb.co/G9hnB13/course-1.webp"
            alt="course"
            width={400}
            height={100}
          />
        </figure>

        <div className="cursor-pointer p-4 hover:bg-white hover:rounded hover:text-cyanPrimary">
          <h2 className="card-title  border px-4 py-2  bg-bluePrimary  ring-1 border-white absolute top-[220px] text-white text-[16px] border-b-0 rounded">
            প্রাইমারী কোর্স
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Image src={avatar} width={40} height={50} alt="avatar" className="rounded-full" />
              <span className="pl-2 text-cyanPrimary hover:text-cyanPrimary">সাইফুল রাহমান</span>
            </div>
            <div className="flex items-center">
              <PiNotebookBold />{" "}
              <span className="pl-1 text-cyanPrimary font-semibold"> ২০ লেসন</span>
            </div>
          </div>
          <p className="py-3">
            প্রতিটি বিষয়ের সেরা মেন্টরের সাথে ৩ ধরনের লাইভ ক্লাসে প্রতিটি টপিক শিখো{" "}
            <Link href="/" className="text-yellowPrimary">
              বিস্তারিত পড়ুন
            </Link>{" "}
          </p>
          <hr />
          <div className="flex">
            <p className="text-sm font-semibold py-3">
              {" "}
              ফ্রী কোর্স <del className="text-gray-400 pr-3 "> -500 Tk </del> 
            </p>
          </div>
          {/* <div className=" card-actions justify-center ">
            <button className="bg-bluePrimary text-white py-2 px-2 transition-all duration-300 rounded hover:bg-yellowPrimary">
              এনরোল করুন
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FreeCourseCard1;
