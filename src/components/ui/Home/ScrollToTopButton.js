'use client'
import { FaArrowUpLong } from "react-icons/fa6";

import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <button
    className={`scroll-to-top ${isVisible ? 'visible' : 'invisible'} bg-bluePrimary text-white rounded-full p-2 fixed bottom-5 right-5 transition-all duration-300 border hover:bg-cyanPrimary hover:transform hover:scale-110`}
    onClick={scrollToTop}
  >
    <FaArrowUpLong className="text-xl" />
  </button>
  
  </>
  );
};

export default ScrollToTopButton;
