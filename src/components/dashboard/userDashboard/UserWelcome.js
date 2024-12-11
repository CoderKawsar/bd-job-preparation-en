"use client";

import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";

const UserWelcome = () => {
  const { userId } = getUserInfo();
  // (getUserInfo())
  const { data } = useGetSingleUserQuery(userId);

  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const updateWelcomeMessage = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setTimeOfDay("Good Morning, ");
      } else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay("Good Afternoon, ");
      } else if (currentHour >= 17 && currentHour < 20) {
        setTimeOfDay("Good Evening, ");
      } else {
        setTimeOfDay("Good Night, ");
      }
    };

    updateWelcomeMessage();

    const intervalId = setInterval(updateWelcomeMessage, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="  rounded-lg py-8 w-100 border border-gray-200">
      <div className="px-10 ">
        <h2 className="text-2xl font-bold pb-3 text-cyan-900 ">
          {`${timeOfDay} ${data?.name}`}
        </h2>
        <h5 className="text-cyan-900 text-lg">
          Get started with{" "}
          <span className="text-cyan-900">BD Job Preparation</span> Dashboard
        </h5>
      </div>
    </div>
  );
};

export default UserWelcome;
