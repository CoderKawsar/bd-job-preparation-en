import { authKey } from "@/constants/storage";
import { removeUserInfo } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import { useRouter } from "next/router";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage("accessToken");
    // (accessToken, 'from axios')

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    // (accessToken, 'from axios1')
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    // prevent more than one login at a time of an user
    const message = response?.data?.message?.toLowerCase();
    if (message && message.includes("session expired")) {
      removeUserInfo(authKey);
      alert("Session expired! Another login found in your account!!!");
    } else return responseObject;
  },
  async function (error) {
    if (error?.response?.status === 403) {
    } else {
      const responseObject = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessages: error?.response?.data?.message,
      };
      return responseObject;
    }

    // return Promise.reject(error);
  }
);

export { instance };
