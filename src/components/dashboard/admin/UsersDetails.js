"use client";

import {
  useChangeRoleMutation,
  useDeleteUserMutation,
} from "@/redux/api/usersApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UsersDetails = ({ user, index }) => {
  const dateObject = new Date(user?.createdAt);
  const localData = dateObject.toLocaleDateString();
  const [changeRole] = useChangeRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleChangeRole = async (userId, currentRole) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to make this user an ${
          currentRole === "admin" ? "student" : "admin"
        }?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, make ${
          currentRole === "admin" ? "student" : "admin"
        }!`,
      });

      if (result.isConfirmed) {
        const payload = {
          user_id: userId,
          role: currentRole === "admin" ? "student" : "admin",
        };
        const response = await changeRole(payload);

        if (Boolean(response?.data)) {
          Swal.fire({
            title: `${currentRole === "admin" ? "Student" : "Admin"} Created!`,
            text: `The user has been made an ${
              currentRole === "admin" ? "student" : "admin"
            } successfully.`,
            icon: "success",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `An error occurred while making the user an ${
          currentRole === "admin" ? "student" : "admin"
        }.`,
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "To delete the user, click 'Delete'; otherwise, click 'Cancel.'",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteUser(id);
        // (res?.data)

        if (res?.data?._id === id) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "user has been deleted.",
            icon: "success",
          });
        } else {
          // Something went wrong with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };

  const getColorClass = (userRole) => {
    switch (userRole) {
      case "admin":
        return "text-blue-500";
      case "super_admin":
        return "text-green-500";
      case "student":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };
  return (
    <tr>
      <td className="border   py-2 md:table-cell">{index + 1}</td>
      <td className="border px-4  py-2 md:table-cell">{user.name}</td>
      <td className="border px-2  py-2 md:table-cell">{user.email}</td>
      <td className="border px-2  py-2 md:table-cell">{user.contact_no}</td>

      <td
        className={`border px-2  py-2 md:table-cell ${getColorClass(
          user.role
        )} `}
      >
        {user.role}
      </td>

      <td className="border">
        <button
          onClick={() => handleChangeRole(user?._id, user?.role)}
          className={` hover:bg-blue-700 font-semibold text-white  py-2 rounded text-sm px-1 ${
            user?.role === "admin" ? "bg-yellow-500" : "bg-blue-500"
          } my-2 ${
            user?.role === "super_admin"
              ? "disabled:opacity-50 cursor-not-allowed bg-gray-400 text-black"
              : ""
          }`}
          disabled={user?.role === "super_admin"}
        >
          Make {user?.role === "admin" ? "Student" : "Admin"}
        </button>
      </td>
      <td className="border px-4 py-2 md:table-cell">{localData}</td>
      <td className="border px-4 py-2 md:table-cell">
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-md"
          onClick={() => handleDelete(user?.id)}
        >
          {" "}
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UsersDetails;
