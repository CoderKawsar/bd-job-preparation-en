"use client";

import { useEffect, useState } from "react";

const Timer = ({ expireDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const expireTime = new Date(expireDate).getTime();
    const difference = expireTime - now;

    if (difference <= 0) {
      // Expired
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div>
      <h2 className="py-5 font-semibold">
        {timeLeft.days > 0 && <span>এখন থেকে {timeLeft.days} দিন বাকি </span>}
        {timeLeft.days === 1 && (
          <>
            {timeLeft.hours > 0 && <span>{timeLeft.hours} hours </span>}
            {timeLeft.minutes > 0 && <span>{timeLeft.minutes} minutes </span>}
            {timeLeft.seconds > 0 && <span>{timeLeft.seconds} seconds </span>}
          </>
        )}
        {timeLeft.days <= 0 && (
          <>
            {timeLeft.hours > 0 && <span>{timeLeft.hours} hours </span>}
            {timeLeft.minutes > 0 && <span>{timeLeft.minutes} minutes </span>}
            {timeLeft.seconds > 0 && <span>{timeLeft.seconds} seconds </span>}
            {timeLeft.days <= 0 &&
              timeLeft.hours <= 0 &&
              timeLeft.minutes <= 0 &&
              timeLeft.seconds <= 0 && <span>Expired</span>}
          </>
        )}
      </h2>
    </div>
  );
};

export default Timer;
