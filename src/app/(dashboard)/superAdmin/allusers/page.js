"use client";
import UsersDetails from "@/components/dashboard/admin/UsersDetails";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";

const AdminAllUsers = () => {
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({
    limit,
    page,
    searchTerm,
  });
  const users = data?.data?.data || [];

  const filteredUsers = users.filter((user) =>
    user?.contact_no?.includes(searchTerm)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    refetch();
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
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-4">Admin - All Users</h1>
      <input
        type="number"
        className="border px-5 py-2 outline-none w-96 mb-5"
        placeholder="Search by Contact Number"
        onChange={handleSearchChange}
      />
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border bg-gray-100   py-2 hidden md:table-cell">
                  S.No
                </th>
                <th className="border bg-gray-100  px-4 py-2 hidden md:table-cell">
                  Name
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Email
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Contact Number
                </th>
                <th className="border bg-gray-100  py-2  hidden md:table-cell">
                  Role
                </th>
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Make Admin
                </th>
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  User registered
                </th>
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UsersDetails key={user?.id} index={index} user={user} />
              ))}
            </tbody>
          </table>

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setPage={setPage}
          />
        </div>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default AdminAllUsers;
