import Image from "next/image";
import Link from "next/link";
import React from "react";

const FreeSeminar = () => {

  const containerStyle = {
    border: '2px solid orange',
    borderRadius: '8px',
  };


  return (
    <div className="bg-bluePrimary py-16">
      <div className="px-3 lg:px-14">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="relative">
          <div className='relative w-full h-0' style={{ paddingBottom: '56.25%', ...containerStyle }}>
              <iframe
                title="YouTube Video"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/CitLPrSS1w0?si=GTpGRpu6sXHvQsac"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
              ></iframe>
            </div>
          </div>
          <div className="space-y-6 text-white lg:pt-20">
            <h3 className="text-2xl font-bold">
              সঠিক দিকনির্দেশনা পেতে ফ্রি অনলাইন সেমিনারে অংশ নিন
            </h3>
            <p className="pb-10">
              সফল ক্যারিয়ার গড়ার সঠিক দিকনির্দেশনা পেতে আমাদের ফ্রি
              সেমিনারগুলোতে অংশগ্রহণ করুন। এসব সেমিনারে প্রশ্নোত্তরের মাধ্যমে
              আপনার কনফিউশন দূর করতে পারবেন।
            </p>
            <a
              href="https://forms.gle/3vjsXVuQi2vUomHX7"
              target="_blank"
              className="bg-cyanPrimary text-white py-3 px-6 rounded transition-all duration-300 hover:bg-yellowPrimary"
            >
              সিট বুক করুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeSeminar;
