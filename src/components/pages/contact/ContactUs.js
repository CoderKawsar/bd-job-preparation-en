import Commonbanner from "@/components/banners/Commonbanner"
import GetInTouch from "./GetInTouch";
import OurMap from "./OurMap";


const ContactUs = () => {
  const breadcrumbItems = [
    { label: 'হোম', link: '/' },
    { label: 'যোগাযোগ' },
  ];
  return (
    <div>
      <Commonbanner title="যোগাযোগ করুন" breadcrumbItems={breadcrumbItems} />
      <GetInTouch />
      <OurMap />
    </div>
  )
}

export default ContactUs