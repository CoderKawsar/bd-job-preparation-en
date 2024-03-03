import jwt_decode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

export const decodedToken = (token) => {
    return jwt_decode(token)
};