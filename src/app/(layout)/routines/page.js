import Commonbanner from "@/components/banners/Commonbanner";
import RoutinesShow from "@/components/pages/AllRoutine/RoutinesShow";

export const metadata = {
  title: "Class Routine",
};
const RoutinesPage = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Class Routine" },
  ];

  return (
    <>
      <Commonbanner title="Class Routine" breadcrumbItems={breadcrumbItems} />

      <RoutinesShow />
    </>
  );
};

export default RoutinesPage;
