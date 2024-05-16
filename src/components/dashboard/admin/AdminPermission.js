"use client";

import {
  useGivePermissionMutation,
  useRemovePermissionMutation,
} from "@/redux/api/usersApi";
import toast from "react-hot-toast";

const AdminPermissions = ({ user, refetchAdmins }) => {
  const [givePermission, { isLoading: permissionGivingLoading }] =
    useGivePermissionMutation();
  const [removePermission, { isLoading: permissionRemovingLoading }] =
    useRemovePermissionMutation();

  const adminPermissions = [
    "user",
    "course",
    "subscription",
    "course_video",
    "exam",
    "book",
    "order_status",
    "order",
  ];

  const handlesPermission = async (permission) => {
    const hasPermission = user?.permission.includes(permission);
    if (hasPermission) {
      await removePermission({ user_id: user?._id, permission });
      toast.success("Permission removed");
    } else {
      await givePermission({ user_id: user?._id, permission });
      toast.success("Permission given");
    }
    refetchAdmins();
  };
  return (
    <div className="flex justify-center flex-wrap">
      {adminPermissions?.map((permission) => (
        <button
          onClick={() => handlesPermission(permission)}
          className={`${
            user?.permission.includes(permission)
              ? "bg-green-500"
              : "bg-red-500"
          } mb-2 flex mx-1 border px-2 text-white py-1 hover:bg-green-500 rounded`}
          disabled={permissionRemovingLoading || permissionGivingLoading}
        >
          {permission}
        </button>
      ))}
    </div>
  );
};

export default AdminPermissions;
