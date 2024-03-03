import { getUserInfo } from "@/services/auth.service";

const checkPermission = (permission) => {
    const { role, permission: permissions } = getUserInfo();
    if (role === "super_admin") {
        return true
    }
    if (role === "admin") {
        if (permissions.includes(permission)) {
            return true
        }
    }
    return false
};

export default checkPermission;