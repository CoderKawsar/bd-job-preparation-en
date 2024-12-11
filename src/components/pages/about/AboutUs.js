import Commonbanner from "@/components/banners/Commonbanner";
import FirstPartAbout from "./FirstPartAbout";
import OurMission from "./OurMission";
import ChooseUs from "./ChooseUs";

const AboutUs = () => {
  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "About Us" }];
  return (
    <div className=" ">
      <Commonbanner title="About Us" breadcrumbItems={breadcrumbItems} />
      <FirstPartAbout />
      <OurMission />
      <ChooseUs />
    </div>
  );
};

export default AboutUs;
