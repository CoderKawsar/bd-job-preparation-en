'use client'

import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";

const UserWelcome = () => {
  const { userId } = getUserInfo();
  // (getUserInfo())
  const { data } = useGetSingleUserQuery(userId);

  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const updateWelcomeMessage = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setTimeOfDay('শুভ সকাল');
      } else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay('শুভ অপরাহ্ন');
      } else if (currentHour >= 17 && currentHour < 20) {
        setTimeOfDay('শুভ সন্ধ্যা');
      } else {
        setTimeOfDay('শুভ রাত');
      }
    };

    updateWelcomeMessage();


    const intervalId = setInterval(updateWelcomeMessage, 60000);

    return () => clearInterval(intervalId);
  }, []);



  return (
    <div className='  rounded-lg py-8 w-100 border border-gray-200'>
      <div className='px-10 '>
        <h2 className='text-2xl font-bold pb-3 text-cyan-900 '>
          {`${timeOfDay} ${data?.name}`}
        </h2>
        <h5 className='text-cyan-900   text-lg'>ক্লাসের খুঁটিনাটি সব জেনে নাও তোমার <span className='text-cyan-900'>ইজি জব প্রিপারেশন</span> ড্যাশবোর্ডে</h5>
      </div>


    </div>
  )
}

export default UserWelcome