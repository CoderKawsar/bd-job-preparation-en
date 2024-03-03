import Commonbanner from "@/components/banners/Commonbanner";
import Memebership from "@/components/dashboard/userDashboard/Memebership";
const breadcrumbItems = [
    { label: 'হোম', link: '/' },
    { label: 'subscribe' },
  ];

const SubscribeAll = () => {
    return (
        <div>
            <Commonbanner title="Subscribe" breadcrumbItems={breadcrumbItems}/>
            <div className="mx-14 py-10">
            <Memebership/>
            </div>
        </div>
    );
};

export default SubscribeAll;