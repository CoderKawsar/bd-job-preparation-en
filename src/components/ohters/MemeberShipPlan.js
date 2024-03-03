import { PiUsersThreeLight, PiUsersThreeThin } from "react-icons/pi";

import { LiaUser } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";

const MemeberShipPlan = () => {
  return (
    <div>
      <section>
        <div className="container mx-auto my-10 z-0">
          <div className="text-center mb-24">

            <h4 className="text-2xl font-bold ">Choose Your Plan</h4>

          </div>
          <div className="grid lg:grid-cols-3 gap-3">
            <div className="  rounded border shadow-md">

              <div className="card svg-card text-center p-4 " >
                <div className="flex justify-center"><span > <LiaUser className=" card-icon-3" /></span></div>
                <div className="card-body">
                  <h5 className="text-center">Simple</h5>
                  <h1><sup>$</sup>19</h1>
                  <p className="opacity-75">user / month</p>
                  <p className="opacity-75 py-2">Bandwidth : 1GB</p>
                  <p className="opacity-75 py-2">OnlineSpach : 500mb</p>
                  <p className="opacity-75 py-2">Support : yes</p>
                  <a className="bg-bluePrimary text-white py-3 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary " href="/subscribe">Buy Now</a>
                </div>
                <div className="custom-shape-divider-bottom-1645939714">
                  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                  </svg>
                </div>

              </div>

            </div>
            <div className="mt-[-24px]">
              <div className=" rounded border shadow-md">

                <div className="card svg-card text-center p-4 " >
                  <div className="flex justify-center"><span > <LuUsers className=" card-icon-3 " /></span> </div>
                  <div className="card-body">
                    <h5 className="text-center">Basic</h5>
                    <h1><sup>$</sup>49</h1>
                    <p className="opacity-75">user / month</p>
                    <p className="opacity-75 py-2">Bandwidth : 2GB</p>
                    <p className="opacity-75 py-2">OnlineSpach : 1GB</p>
                    <p className="opacity-75 py-2">Support : yes</p>
                    <a className="bg-yellowPrimary text-white py-3 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary " href="/subscribe">Buy Now</a>
                  </div>
                  <div className="custom-shape-divider-bottom-1645939714">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
            <div className=" rounded border shadow-md">

              <div className="card svg-card text-center p-4 " >
                <div className=" flex justify-center"><span > <PiUsersThreeLight className=" card-icon-3" /></span></div>
                <div className="card-body">
                  <h5 className="text-center">Pro Max</h5>
                  <h1><sup>$</sup>89</h1>
                  <p className="opacity-75">user / month</p>
                  <p className="opacity-75 py-2">Bandwidth : 5GB</p>
                  <p className="opacity-75 py-2">OnlineSpach : 1.5GB</p>
                  <p className="opacity-75 py-2">Support : yes</p>
                  <a className="bg-cyanPrimary text-white py-3 px-4 transition-all duration-300 rounded hover:bg-bluePrimary " href="/subscribe">Buy Now</a>
                </div>
                <div className="custom-shape-divider-bottom-1645939714">
                  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                  </svg>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemeberShipPlan