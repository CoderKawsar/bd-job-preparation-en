import Commonbanner from "@/components/banners/Commonbanner";
import FirstPartAbout from "./FirstPartAbout";
import OurMission from "./OurMission";
import ChooseUs from "./ChooseUs";

const AboutUs = () => {
  const breadcrumbItems = [
    { label: 'হোম', link: '/' },
    { label: 'আমাদের সম্পর্কে' },
  ];
  return (
    <div className=" ">
      <Commonbanner title="আমাদের সম্পর্কে" breadcrumbItems={breadcrumbItems} />
      <FirstPartAbout />
      <OurMission />
      <ChooseUs />
    </div>
  );
};

export default AboutUs;
