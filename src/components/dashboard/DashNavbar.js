"use client";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import ToggleTheme from "../shared/ToggleTheme";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storage";
import { getUserInfo, isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";

const DashNavbar = () => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { userId } = getUserInfo();
  const { data } = useGetSingleUserQuery(userId);

  // logout

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };


  return (
    <div className=" bg-gray-200 border-b border-b-gray-300 sticky top-0 z-50">
      <div className="navbar px-5">
        <div className="navbar-start ">
          <Link href="/" className="text-lg font-bold text-cyan-900">
          ইজি জব প্রিপারেশন
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <p className="px-3 text-lg font-bold"> ড্যাশবোর্ড</p>
        </div>
        <div className="navbar-end">
          {/* <ToggleTheme /> */}
          {userLoggedIn ? (
            <>
              <h2 className="text-xl font-bold ">{data?.name}</h2>
              <div
                className="flex items-center gap-3 bg-yellowPrimary text-white transition-all  hover:bg-blue-900 cursor-pointer px-3 py-2 ml-2 text-sm rounded"
                onClick={logout}
              >
                <FiLogOut fontSize={20} />
                <button className=" ">লগ আউট</button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 bg-blue-600 text-white transition-all  hover:bg-blue-900 cursor-pointer px-3 py-2 rounded">
              <Link href="/login" className="text-xl ">
                লগইন
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
