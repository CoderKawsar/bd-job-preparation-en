"use client";
import UserCourses from "@/components/dashboard/userDashboard/UserCourses";

const MyCourses = () => {
  return (
    <div className="text-center">
      <div>
        <h2 className="text-2xl text-black font-bold w-fit mx-auto pb-1 mb-10 border-b-2">
          My Courses
        </h2>
      </div>
      <UserCourses />
    </div>
  );
};

export default MyCourses;
