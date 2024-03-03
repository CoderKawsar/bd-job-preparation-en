import React from "react";
import UserWelcome from "./UserWelcome";
import UserProfileInfo from "./UserProfileInfo";
import UserCourses from "./UserCourses";

const UserContent = () => {
  return (
    <>
      <UserWelcome />
      <UserProfileInfo />
      <UserCourses />
    </>
  );
};

export default UserContent;
