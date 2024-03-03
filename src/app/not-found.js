import Image from "next/image";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex justify-center items-center">
        <div>
          <div>
            <Image
              src="https://i.ibb.co/6wwB2Qm/404.png"
              alt="404 Image"
              width={400}
              height={200}
            />
          </div>
          <div className="text-center py-10">
            <h1 className="text-4xl pb-5">পেইজটি খুজে পাওয়া যাচ্ছেনা</h1>
            <Link href="/">
              <button className="bg-blue-700 text-white text-lg  px-7 py-3 rounded transition-all hover:bg-blue-900">
                হোমে ফিরে যান
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notFound;
