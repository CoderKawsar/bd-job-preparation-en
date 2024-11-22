import { PiSmiley, PiStudentBold } from "react-icons/pi";
import { TbPhoneCall, TbWorld } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import ContactForm from "./ContactForm";
import Link from "next/link";

const GetInTouch = () => {
  return (
    <div className="lg:px-14 py-20 px-5">
      <div className="text-center space-y-3 pb-20">
        <h5 className="text-bluePrimary uppercase">কোন সহযোগিতা প্রয়োজন?</h5>
        <h2 className=" font-bold text-2xl">আমাদের সাথে যোগাযোগ করুন</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="grid lg:grid-cols-2 gap-7">
          <Link href="/">
            <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
              <div className="space-y-2 text-center">
                <div className="flex justify-center items-center ">
                  <TbWorld className="text-4xl text-bluePrimary rounded-full bg-blue-200 p-2" />
                </div>

                <h2 className="font-bold text-xl">আমাদের ওয়েবসাইট</h2>
                <p className="">বিডি জব প্রিপারেশন</p>
              </div>
            </div>
          </Link>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <TbPhoneCall className="text-4xl text-bluePrimary rounded-full bg-blue-200 p-2" />
              </div>

              <h2 className="font-bold text-xl">আমাদের কল করুন</h2>
              <p className="">+৮৮০ ১৮ ৮৬৩ ৪৭৩৫০</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <MdOutlineMailOutline className="text-4xl " />
              </div>

              <h2 className="font-bold text-xl">আমাদের ইমেইল করুন</h2>
              <p className="">easyjobpreperation@gmail.com</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <LuMapPin className="text-4xl " />
              </div>

              <h2 className="font-bold text-xl">আমাদের ঠিকানা</h2>
              <p className="">ঢাকা অফিস: দিলকুশা আর/এ, মতিঝিল, ঢাকা-১২২৩</p>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
