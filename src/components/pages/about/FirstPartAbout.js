import Image from "next/image";
import img1 from '../../../assets/images/about-img1.jpg';
import img2 from '../../../assets/images/about-img-2.jpg';
import Link from "next/link";
import { FaBuildingColumns} from "react-icons/fa6";
import { PiBookOpenTextBold,PiVideoCameraFill } from "react-icons/pi";
import { GrCertificate } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import { TbBuildingCommunity } from "react-icons/tb";


const FirstPartAbout = () => {
  return (
    <div className="px-14 py-20">


    <div className="grid lg:grid-cols-2 gap-10">
        <div className="relative">
            <Image src={img1} alt="about img" width={450} height={300}/>
            <div className="absolute bottom-24 right-5">
            <Image src={img2} alt="about img" width={200} height={300}/>
            </div>
        </div>
        <div className="space-y-5">
            <h5 className="uppercase font-bold text-bluePrimary ">About Us</h5>
            <h2 className="text-3xl font-semibold text-black text-justify">Easy Job Preparetion</h2>
            <p className="text-black text-justify">Online learning has become increasingly popular in recent years, offering a flexible and convenient way for individuals to pursue education and training.Our online learning platform is designed to be flexible, enabling you to fit your learning around your busy schedule. You can access the courses on any device, including desktop computers, tablet & mobile devices.</p>

            <div className="flex justify-between items-center">
             <div>
                <div className="flex justify-center p-2 rounded-lg bg-blue-600">
                <PiBookOpenTextBold  className="text-white text-5xl"/>
                </div>
             </div>
             <div className="pl-5">
                <h4 className="text-xl font-semibold text-bluePrimary">Flexible Classes</h4>
                <p className="text-black text-justify">Flexible Classes refers to the process of acquiring knowledge or skills through the use of digital technologies and the internet.</p>
             </div>
            </div>
            <div className="flex justify-between items-center">
             <div>
                <div className="flex justify-center p-2 rounded-lg bg-blue-600">
                <FaBuildingColumns  className="text-white text-5xl"/>
                </div>
             </div>
             <div className="pl-5">
                <h4 className="text-xl font-semibold text-bluePrimary">Learn From Anywhere</h4>
                <p className="text-black text-justify">Whether you are a busy professional, a stay-at-home parent, or a student who prefers to study from home effectively.</p>
             </div>
            </div>

            <div className="grid grid-cols-2 gap-10 py-5">

            <div className="flex  items-center">
                <div className="flex justify-center p-3 rounded-full bg-teal-400">
                <GrCertificate  className="text-white text-3xl"/>
                </div>
                <h5 className="pl-5">100+ Verified Course</h5>

            </div>
            <div className="flex  items-center">
                <div className="flex justify-center p-3 rounded-full bg-violet-400">
                <PiVideoCameraFill  className="text-white text-3xl"/>
                </div>
                <h5 className="pl-5">256+ Free Videos</h5>

            </div>
            <div className="flex  items-center">
                <div className="flex justify-center p-3 rounded-full bg-pink-400">
                <GiTeacher  className="text-white text-3xl"/>
                </div>
                <h5 className="pl-5">Expert Instructors</h5>

            </div>
            <div className="flex  items-center">
                <div className="flex justify-center p-3 rounded-full bg-sky-400">
                <TbBuildingCommunity  className="text-white text-3xl"/>
                </div>
                <h5 className="pl-5">Big Student Community</h5>

            </div>

            </div>
            <div className="py-5">
            <Link href="/courses" className="bg-bluePrimary text-white py-3 px-6 transition-all duration-300 rounded hover:bg-cyanPrimary font-semibold"> Explore Courses </Link>
            </div>
        </div>
    </div>





    </div>
  )
}

export default FirstPartAbout