'use client'
import { getUserInfo } from "@/services/auth.service";
// import AdminDashboard from "./profile/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// export const metadata = {
//     title: 'অ্যাডমিন ড্যাশবোর্ড',
//     description: 'a admin homepage',
// }



const DashboardLayout = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const { role, userId } = getUserInfo();
  useEffect(() => {
    setIsLoading(true)
    if (role !== 'admin' && role !== 'super_admin') {
      router.push('/')
    }

    setIsLoading(false)
  }, [router, role, isLoading]);

  if (isLoading) {
    return <p className="text-center py-20 text-2xl font-bold">Loading...</p>
  }

  return (
    <div>
      {/* <AdminDashboard /> */}
      {children}
    </div>
  );

};

export default DashboardLayout;