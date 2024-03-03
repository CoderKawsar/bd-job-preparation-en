
import Commonbanner from "@/components/banners/Commonbanner";
import RoutinesShow from "@/components/pages/AllRoutine/RoutinesShow";

export const metadata = {
  title: "ক্লাস রুটিন"
}
const RoutinesPage = () => {

  const breadcrumbItems = [
    { label: 'হোম', link: '/' },
    { label: 'ক্লাস রুটিন' },
  ];


  return (
    <>
      <Commonbanner title="ক্লাস রুটিন" breadcrumbItems={breadcrumbItems} />

      <RoutinesShow />
    </>
  );
};

export default RoutinesPage;
