import { authKey } from "@/constants/storage";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }) => {
  // (accessToken)
  return setToLocalStorage(authKey, accessToken);
};



export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // (authToken)
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};
export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};
