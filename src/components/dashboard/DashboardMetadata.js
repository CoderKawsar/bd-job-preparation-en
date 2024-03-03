'use client'
import DashNavbar from "@/components/dashboard/DashNavbar";
import UserSidebar from "@/components/dashboard/userDashboard/UserSidebar";
import UserWelcome from "@/components/dashboard/userDashboard/UserWelcome";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardMetadata = ({ children }) => {
    const router = useRouter();
    const userLoggedIn = isLoggedIn();
    const [isLoading, setIsLoading] = useState(false);
    const { role, userId } = getUserInfo();


    const { data: user } = useGetSingleUserQuery(userId);
    const shouldShowWelcomeComponent = !(role === "admin" || role === "super_admin");

    useEffect(() => {
        // if(role !== 'admin' || role !== 'super_admin'){
        //   router.push('/')
        // }
        if (!userLoggedIn) {
            router.push("/login")
        }
        setIsLoading(true)
    }, [router, isLoading, userLoggedIn]);

    if (!isLoading) {
        return <p className="text-center py-20 text-2xl font-bold">Loading...</p>
    }


    return (
        <div>
            <DashNavbar />
            <div className="pb-12">
                <div className="  mt-5 rounded z-0">
                    <UserSidebar />
                </div>
                <div className=" mt-5 rounded px-10 pt-10 lg:ml-60 ml-10" >
                    {shouldShowWelcomeComponent && <UserWelcome />}
                    <br />
                    {children}

                </div>
            </div>



        </div>
    );
};

export default DashboardMetadata;