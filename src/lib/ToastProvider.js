"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ToastProvider;
