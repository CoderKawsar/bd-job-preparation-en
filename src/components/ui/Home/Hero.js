'use client'
import React from "react";
import banner from "../../../assets/images/Easy_Job_Preparation_Banner.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="banner bg-cyanPrimary py-10">
        <div className="hero-content flex-col lg:flex-row-reverse z-0">
          <Image src={banner} className=" rounded-lg z-0" alt="hero img" />
          <div className="">
            <h1 className="text-5xl font-bold leading-relaxed text-cyanPrimary z-0">
              নিজের মত শিখুন, <br />
              আত্মবিশ্বাস গড়ুন!
            </h1>
            <p className="pt-6 pb-3  font-medium text-lg z-0">
              চাকরির জন্য নিজেকে প্রস্তুত করতে ইজি জব প্রিপারেশন{" "}
              <span className="opacity-0">ক্যারিয়ার ট্র্যাক কোর্সগুলোই যথেষ্ট।</span>
            </p>
            <p className="pb-12 font-medium text-lg z-0"> ক্যারিয়ার ট্র্যাক কোর্সগুলোই যথেষ্ট।</p>
            <Link href={'/courses'} className="bg-bluePrimary text-white py-3 px-6 transition-all duration-300 rounded hover:bg-cyanPrimary z-0">
              কোর্সগুলো দেখুন
            </Link >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
