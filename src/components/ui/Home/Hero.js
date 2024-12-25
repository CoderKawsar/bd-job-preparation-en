"use client";
import React from "react";
import banner from "../../../assets/images/Easy_Job_Preparation_Banner.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="banner bg-cyanPrimary py-10 px-10">
        <div className="hero-content flex-col lg:flex-row-reverse z-0">
          <Image src={banner} className=" rounded-lg z-0" alt="hero img" />
          <div>
            <h1 className="text-5xl leading-snug font-bold  text-cyanPrimary z-0 uppercase raleway-font">
              Learn at your own pace, <br />
              Build confidence!
            </h1>
            <p className="pt-6 pb-8 leading-relaxed font-medium text-lg z-0">
              To prepare yourself for a job, BD Job Preparation
              <span className="block">Career track courses are enough.</span>
            </p>
            {/* <p className="pb-8 pt-2 mt-0 font-medium text-lg z-0">
              
            </p> */}
            <Link
              href={"/courses"}
              className="bg-bluePrimary text-white py-3 px-6 transition-all duration-300 rounded hover:bg-cyanPrimary z-0"
            >
              Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
