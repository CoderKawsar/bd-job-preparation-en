"use client";

import AdminPermissions from "@/components/dashboard/admin/AdminPermission";
import {
  useGetAllUsersQuery,
} from "@/redux/api/usersApi";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";



export const adminPermissions = [
  "user",
  "course",
  "subscription",
  "course_video",
  "exam",
  "quiz",
  "question",
  "book",
  "order_status",
  "order",

];

const AllAdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);


  const {
    data,
    isLoading,
    isError,
    refetch: refetchAdmins,
  } = useGetAllUsersQuery({
    role: "admin", 
    limit,
    page, 
    searchTerm,
  });
 


  const admins = data?.data?.data || [];


  const filteredUsers = admins.filter((user) =>
    user?.contact_no?.includes(searchTerm)
  );




  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    refetchAdmins();
  }, [limit, page, searchTerm]);

  const totalData = data?.data?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);


  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }
  return (
    <div className="  py-4 ">
      <h1 className="text-2xl font-bold mb-4">All Admins Here</h1>
      <input
        type="number"
        className="border px-5 py-2 outline-none w-96 rounded mb-5"
        placeholder="Search by Contact Number"
        onChange={handleSearchChange}
      />
      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-300">
            <thead>
              <tr>
                <th className="border bg-gray-100  px-4 py-2 hidden md:table-cell">
                  Name
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Email
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Contact Number
                </th>

                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {admins?.map((user) => (
                <tr key={user?.id}>
                  <td className="border px-4  py-2 md:table-cell">
                    {user.name}
                  </td>
                  <td className="border px-2  py-2 md:table-cell">
                    {user.email}
                  </td>
                  <td className="border px-2  py-2 md:table-cell">
                    {user.contact_no}
                  </td>

                  <td className="border  py-2 md:table-cell">
                    <AdminPermissions
                      user={user}
                      refetchAdmins={refetchAdmins}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/>


        </div>
      ) : (
        <p>No admin available.</p>
      )}
    </div>
  );
};

export default AllAdminPage;
