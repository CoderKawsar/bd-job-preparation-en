import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SiYoutubemusic } from "react-icons/si";

const FreeSeminar = () => {
  return (
    <div className="bg-bluePrimary py-16">
      <div className="lg:px-14  px-3 ">
        <div className=" grid lg:grid-cols-2  gap-5">
          <div className="relative    transition duration-300 ease-in-out hover:opacity-60">
            {/* <Image className="rounded " src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp" alt="booking" height={300} width={500}/> */}
            <div className=" ">
            {/* <a href="https://www.youtube.com/watch?v=CitLPrSS1w0" target="_blank" rel="noopener noreferrer">
            <SiYoutubemusic className="text-6xl text-white "/>
            </a> */}
            <iframe width="560" height="315" className="hidden lg:block" src="https://www.youtube.com/embed/CitLPrSS1w0?si=GTpGRpu6sXHvQsac" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
          <div className="lg:pt-20 text-white space-y-6">
            <h3 className="font-bold text-2xl">সঠিক দিকনির্দেশনা পেতে ফ্রি অনলাইন সেমিনারে অংশ নিন</h3>
            <p className="pb-10">
              সফল ক্যারিয়ার গড়ার সঠিক দিকনির্দেশনা পেতে আমাদের ফ্রি সেমিনারগুলোতে অংশগ্রহণ করুন। এসব
              সেমিনারে প্রশ্নোত্তরের মাধ্যমে আপনার কনফিউশন দূর করতে পারবেন।
            </p>
            <a href="https://forms.gle/3vjsXVuQi2vUomHX7" target="_blank" className="bg-cyanPrimary text-white py-3 px-6 transition-all duration-300 rounded hover:bg-yellowPrimary">সিট বুক করুন</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeSeminar;
