import Link from 'next/link'
import React from 'react'

const SelectCarreer = () => {
  return (
    <div className='mt-10  bg-bluePrimary  py-10'>

    <div className='py-10 text-center text-white'> 
        <h2 className='font-bold text-3xl pb-5'>সফল ক্যারিয়ার গড়তে সঠিক প্রোগ্রামটি বেছে নিন</h2>
        <h5 className=' text-xl pb-5 leading-relaxed'>সফল ক্যারিয়ার গড়তে দরকার সঠিক জায়গায় নিজের সময় আর পরিশ্রম দেয়া। <br /> তাই ইজি জব প্রিপারেশন থেকেই অর্জন করুন জব-রেডি হবার কনফিডেন্স আর স্কিল।</h5>

       <div>
       <Link href="/courses" className="bg-cyanPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-transparent hover:border border-cyan-900">সবগুলো কোর্স দেখুন </Link>
        <a href="https://forms.gle/3vjsXVuQi2vUomHX7" className="bg-gray-600 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary mx-4" target="_blank"> সেমিনারে অংশ নেন</a>
        {/* <a href="https://forms.gle/3vjsXVuQi2vUomHX7" className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary md: mt-5" target="_blank"> কল বুক করুন</a> */}
       
       </div>
    </div>



    </div>
  )
}

export default SelectCarreer