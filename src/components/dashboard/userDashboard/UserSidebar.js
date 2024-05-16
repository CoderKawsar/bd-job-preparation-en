"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaAddressBook,
  FaBook,
  FaBookOpen,
  FaNewspaper,
  FaFileVideo,
} from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { PiExamFill } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa6";
import { MdQuiz } from "react-icons/md";
import { useState } from "react";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import checkPermission from "@/utils/checkPermission";
import { usePathname } from "next/navigation";

const UserSidebar = () => {
  const pathname = usePathname();
  const { role, permission, userId } = getUserInfo();

  const { data: user } = useGetSingleUserQuery(userId);
  //   (user)

  // (role, 'basic dash')

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <div className="z-50">
      <button className="block lg:hidden px-2 py-1 " onClick={toggleSidebar}>
        ☰
      </button>
      <div
        className={`bg-gray-200 h-screen w-64 fixed top-0 left-0 overflow-y-auto transition-transform transform lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center mt-16">
          {isOpen && (
            <button
              className="text-black font-bold text-xl"
              onClick={closeSidebar}
            >
              ✕
            </button>
          )}
        </div>

        <ul className="menu ">
          {role === "admin" ? (
            <>
              <ul className=" text-start">
                <li>
                  <Link href="/profile" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/profile" ? "active" : ""
                      }`}
                    >
                      <ImProfile fontSize={20} /> প্রোফাইল
                    </a>
                  </Link>
                </li>

                {checkPermission("course") && (
                  <li>
                    <Link href={"/admin/addcourse"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addcourse" ? "active" : ""
                        }`}
                      >
                        <SiCoursera />
                        কোর্স যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("subscription") && (
                  <li>
                    <Link
                      href={"/admin/addSubscription"}
                      passHref
                      legacyBehavior
                    >
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addSubscription" ? "active" : ""
                        }`}
                      >
                        <MdSubscriptions fontSize={20} />
                        সাবস্ক্রিপশন যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("course_video") && (
                  <li>
                    <Link href={"/admin/addvideo"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addvideo" ? "active" : ""
                        }`}
                      >
                        <FaFileVideo />
                        ভিডিও যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("exam") && (
                  <li>
                    <Link href={"/admin/addexams"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addexams" ? "active" : ""
                        }`}
                      >
                        <PiExamFill />
                        পরীক্ষা যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}

                {checkPermission("exam") && (
                  <li>
                    <Link href={"/admin/addquiz"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addquiz" ? "active" : ""
                        }`}
                      >
                        <MdQuiz /> কুইজ যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("exam") && (
                  <li>
                    <Link href={"/admin/addquestions"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addquestions" ? "active" : ""
                        }`}
                      >
                        <BsFillQuestionSquareFill /> লিখিত প্রশ্ন যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("book") && (
                  <li>
                    <Link href={"/admin/addbooks"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/addbooks" ? "active" : ""
                        }`}
                      >
                        <FaBookOpen />
                        বই যোগ করুন
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("order") && (
                  <li>
                    <Link href={"/admin/allorders"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/allorders" ? "active" : ""
                        }`}
                      >
                        <FaBookOpen />
                        সব অর্ডার সমূহ
                      </a>
                    </Link>
                  </li>
                )}

                {checkPermission("order") && (
                  <li>
                    <Link
                      href={"/admin/alluserscourses"}
                      passHref
                      legacyBehavior
                    >
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/alluserscourses" ? "active" : ""
                        }`}
                      >
                        <FaBookOpen />
                        সব কেনা কোর্স সমূহ
                      </a>
                    </Link>
                  </li>
                )}
                {checkPermission("exam") && (
                  <li>
                    <Link href={"/admin/allexams"} passHref legacyBehavior>
                      <a
                        className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                          pathname === "/admin/allexams" ? "active" : ""
                        }`}
                      >
                        <FaBookOpen />
                        সব পরিক্ষা সমূহ
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            </>
          ) : role === "super_admin" ? (
            <>
              <ul className="flex flex-col items-start">
                <li>
                  <Link href="/profile" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/profile" ? "active" : ""
                      }`}
                    >
                      <ImProfile fontSize={20} /> প্রোফাইল
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/superAdmin/allusers"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/superAdmin/allusers" ? "active" : ""
                      }`}
                    >
                      <ImProfile fontSize={20} />
                      ব্যবহারকারী
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/superAdmin/alladmin"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/superAdmin/alladmin" ? "active" : ""
                      }`}
                    >
                      <ImProfile fontSize={20} />
                      সকল এডমিন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/superAdmin/addcategory"}
                    passHref
                    legacyBehavior
                  >
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addcategory" ? "active" : ""
                      }`}
                    >
                      <FaAddressBook />
                      সকল বিভাগ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/superAdmin/addsubcategory"}
                    passHref
                    legacyBehavior
                  >
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addsubcategory" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaAddressBook />
                      সকল উপ বিভাগ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addcourse"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addcourse" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <SiCoursera fontSize={20} />
                      কোর্স যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addSubscription"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addSubscription" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <MdSubscriptions fontSize={20} />
                      সাবস্ক্রিপশন যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addvideo"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addvideo" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaFileVideo />
                      ভিডিও যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addexams"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addexams" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <PiExamFill />
                      পরীক্ষা যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addquiz"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addquiz" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <MdQuiz /> কুইজ যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addquestions"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addquestions" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <BsFillQuestionSquareFill /> লিখিত প্রশ্ন যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/addbooks"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/addbooks" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaBook />
                      বই যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/superAdmin/addsubject"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/superAdmin/addsubject" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaNewspaper />
                      সাবজেক্ট যোগ করুন
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/allorders"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/allorders" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaBookOpen />
                      সব অর্ডার সমূহ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/alluserscourses"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/alluserscourses" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaBookOpen />
                      সব কেনা কোর্স সমূহ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/allexams"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/admin/allexams" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <FaBookOpen />
                      সব পরিক্ষা সমূহ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/superAdmin/addnotice"} passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/superAdmin/addnotice" ? "active" : ""
                      }`}
                    >
                      {" "}
                      <IoIosNotifications size={30} />
                      নোটিশ যোগ করুন
                    </a>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="space-y-3">
                <li>
                  <Link href="/profile" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/profile" ? "active" : ""
                      }`}
                    >
                      <ImProfile fontSize={20} /> প্রোফাইল
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/user/mycourses" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/user/mycourses" ? "active" : ""
                      }`}
                    >
                      <SiCoursera fontSize={18} /> আমার কোর্স
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/user/mypdfbook" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/user/mypdfbook" ? "active" : ""
                      }`}
                    >
                      <SiCoursera fontSize={18} /> আমার কেনা বইসমুহ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/user/myexams" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/user/myexams" ? "active" : ""
                      }`}
                    >
                      <SiCoursera fontSize={18} /> আমার পরিক্ষাসমুহ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/user/myresults" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/user/myresults" ? "active" : ""
                      }`}
                    >
                      <SiCoursera fontSize={18} /> আমার রেজাল্টসমূহ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/user/userorder" passHref legacyBehavior>
                    <a
                      className={`transition-all text-cyan-900 text-lg py-2 rounded flex items-center gap-3 bg-gray-200 ${
                        pathname === "/user/userorder" ? "active" : ""
                      }`}
                    >
                      <FaBorderAll fontSize={18} /> অর্ডার হিসট্রি
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/user/membershipplan"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
                  >
                    <MdRememberMe fontSize={18} /> মেম্বারশিপ প্লান
                  </Link>
                </li> */}
                <br /> <br />
                <li>
                  <Link href="/" className=" ">
                    {" "}
                    <Image
                      src="https://i.ibb.co/q1gL2Zp/app-img.png"
                      alt="app-img"
                      width={200}
                      height={40}
                    />{" "}
                  </Link>
                </li>
              </ul>
            </>
          )}
          <div className="divider"></div>
        </ul>
      </div>
      <style jsx>{`
        .menu a.active {
          background-color: #172554;
          color: #ffffff;
        }
        .menu a:hover {
          background-color: #172554;
          color: #ffffff;
        }
      `}</style>
    </div>
  );

  // return (
  //   <div className="z-50" >
  //     <button className="block lg:hidden px-2 py-1 " onClick={toggleSidebar}>
  //       ☰
  //     </button>
  //     <div
  //       className={`bg-gray-200 h-screen w-64 fixed top-0 left-0 overflow-y-auto transition-transform transform lg:transform-none ${isOpen ? "translate-x-0" : "-translate-x-full"
  //         }`}
  //     >
  //       <div className="p-4 flex justify-between items-center mt-16">
  //         {isOpen && (
  //           <button className="text-black font-bold text-xl" onClick={closeSidebar}>
  //             ✕
  //           </button>
  //         )}
  //       </div>

  //       <ul className="menu ">
  //         {role === "admin" ? (
  //           <>
  //             <ul className=" text-start">
  //               <li>
  //                 <Link
  //                   href="/profile"
  //                   className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "
  //                 >
  //                   <ImProfile fontSize={20} /> প্রোফাইল
  //                 </Link>
  //               </li>

  //               {/* <li className="">
  //                 <Link href={"/admin/addcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200">
  //                   {" "}
  //                   <FaAddressBook />
  //                   বিভাগ যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addsubcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaAddressBook />
  //                   উপ বিভাগ যোগ করুন
  //                 </Link>
  //               </li> */}
  //               {
  //                 checkPermission("course") && <li >
  //                   <Link href={"/admin/addcourse"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                     {" "}
  //                     <SiCoursera />
  //                     কোর্স যোগ করুন
  //                   </Link>
  //                 </li>
  //               }
  //               {
  //                 checkPermission("subscription") && <li >
  //                   <Link href={"/admin/addSubscription"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                     {" "}
  //                     <MdSubscriptions fontSize={20} />
  //                     সাবস্ক্রিপশন যোগ করুন
  //                   </Link>
  //                 </li>
  //               }
  //               {checkPermission("course_video") && <li >
  //                 <Link href={"/admin/addvideo"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900  py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaFileVideo />
  //                   ভিডিও যোগ করুন
  //                 </Link>{" "}
  //               </li>}
  //               {checkPermission('exam') && <li >
  //                 <Link href={"/admin/addexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900  py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   <PiExamFill />
  //                   পরীক্ষা যোগ করুন
  //                 </Link>
  //               </li>}
  //               {checkPermission('exam') &&  <li >
  //                 <Link href={"/admin/addquiz"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900  py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   <MdQuiz /> কুইজ যোগ করুন
  //                 </Link>
  //               </li>}
  //             {checkPermission('exam') &&  <li >
  //                 <Link href={"/admin/addquestions"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   <BsFillQuestionSquareFill /> লিখিত প্রশ্ন যোগ করুন
  //                 </Link>
  //               </li>}
  //               {
  //                 checkPermission("book") && <li >
  //                   <Link href={"/admin/addbooks"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                     {" "}
  //                     <FaBookOpen />
  //                     বই যোগ করুন
  //                   </Link>
  //                 </li>
  //               }
  //               {checkPermission("order") && <li >
  //                 <Link href={"/admin/allorders"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   সব অর্ডার সমূহ
  //                 </Link>
  //               </li>}
  //               {checkPermission('order') && <li >
  //                 <Link href={"/admin/alluserscourses"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   সব কেনা কোর্স সমূহ
  //                 </Link>
  //               </li>}
  //               {checkPermission('exam') && <li >
  //                 <Link href={"/admin/allexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900  py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   সব পরিক্ষা  সমূহ
  //                 </Link>
  //               </li>
  //         }
  //             </ul>
  //           </>
  //         ) : role === "super_admin" ? (
  //           <>
  //             <ul className="flex flex-col items-start">
  //               <li>
  //                 <Link
  //                   href="/profile"
  //                   className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "
  //                 >
  //                   <ImProfile fontSize={20} /> প্রোফাইল
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/superAdmin/allusers"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "> <ImProfile fontSize={20} />ব্যবহারকারী</Link>
  //               </li>
  //               <li >
  //                 <Link href={"/superAdmin/alladmin"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "> <ImProfile fontSize={20} />সকল এডমিন</Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaAddressBook />
  //                   সকল বিভাগ
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addsubcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaAddressBook />
  //                   সকল উপ বিভাগ
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addcourse"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <SiCoursera fontSize={20} />
  //                   কোর্স যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addSubscription"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <MdSubscriptions fontSize={20} />
  //                   সাবস্ক্রিপশন যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addvideo"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaFileVideo />
  //                   ভিডিও যোগ করুন
  //                 </Link>{" "}
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   <PiExamFill />
  //                   পরীক্ষা যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addquiz"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   <MdQuiz /> কুইজ যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addquestions"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   <BsFillQuestionSquareFill /> লিখিত প্রশ্ন যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/addbooks"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   বই যোগ করুন
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/allorders"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   সব অর্ডার সমূহ
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/alluserscourses"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   সব কেনা কোর্স সমূহ
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/admin/allexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
  //                   {" "}
  //                   <FaBookOpen />
  //                   সব পরিক্ষা  সমূহ
  //                 </Link>
  //               </li>
  //               <li >
  //                 <Link href={"/superAdmin/addnotice"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">

  //                   <IoIosNotifications size={30} />
  //                   নোটিশ যোগ করুন
  //                 </Link>
  //               </li>
  //             </ul>
  //           </>
  //         ) : (
  //           <>
  //             <ul className="space-y-3">
  //               <li>
  //                 <Link
  //                   href="/profile"
  //                   className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-2 hover:text-white rounded flex items-center gap-3 "
  //                 >
  //                   <ImProfile fontSize={20} /> প্রোফাইল
  //                 </Link>
  //               </li>

  //               <li>
  //                 <Link
  //                   href="/user/mycourses"
  //                   className="transition-all text-cyan-900  text-lg hover:bg-blue-900  py-2 hover:text-white rounded flex items-center gap-3 "
  //                 >
  //                   <SiCoursera fontSize={18} /> আমার কোর্স
  //                 </Link>
  //               </li>
  //               <li>
  //                 <Link
  //                   href="/user/mypdfbook"
  //                   className="transition-all text-cyan-900  text-lg hover:bg-blue-900  py-2 hover:text-white rounded flex items-center gap-3 "
  //                 >
  //                   <SiCoursera fontSize={18} /> আমার কেনা  বইসমুহ
  //                 </Link>
  //               </li>

  //               <li>
  //                 <Link
  //                   href="/user/myexams"
  //                   className="transition-all text-cyan-900  text-lg hover:bg-blue-900    py-2 hover:text-white rounded flex items-center gap-3 "
  //                 >
  //                   <SiCoursera fontSize={18} /> আমার পরিক্ষাসমুহ
  //                 </Link>
  //               </li>
  //               <li>
  //                 <Link
  //                   href="/user/myresults"
  //                   className="transition-all text-cyan-900  text-lg hover:bg-blue-900    py-2 hover:text-white rounded flex items-center gap-3  "
  //                 >
  //                   <SiCoursera fontSize={18} /> আমার রেজাল্টসমূহ
  //                 </Link>
  //               </li>

  //               <li>
  //                 <Link
  //                   href="/user/userorder"
  //                   className="transition-all text-cyan-900  text-lg hover:bg-blue-900  py-2 hover:text-white rounded flex items-center gap-3 "
  //                 >
  //                   <FaBorderAll fontSize={18} /> অর্ডার হিসট্রি
  //                 </Link>
  //               </li>

  //               {/* <li>
  //                 <Link
  //                   href="/user/membershipplan"
  //                   className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
  //                 >
  //                   <MdRememberMe fontSize={18} /> মেম্বারশিপ প্লান
  //                 </Link>
  //               </li> */}
  //               <br /> <br />
  //               <li>
  //                 <Link href="/" className=" ">
  //                   {" "}
  //                   <Image
  //                     src="https://i.ibb.co/q1gL2Zp/app-img.png"
  //                     alt="app-img"
  //                     width={200}
  //                     height={40}
  //                   />{" "}
  //                 </Link>
  //               </li>
  //             </ul>
  //           </>
  //         )}
  //         <div className="divider"></div>
  //       </ul>
  //     </div>
  //   </div>
  // );
};

export default UserSidebar;
