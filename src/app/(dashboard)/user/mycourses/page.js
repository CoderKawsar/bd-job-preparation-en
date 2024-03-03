'use client'
import UserCourses from "@/components/dashboard/userDashboard/UserCourses"


const MyCourses = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl text-black font-bold pb-10"> আমার কোর্স</h2>
      <UserCourses />
    </div>
  )
}

export default MyCourses