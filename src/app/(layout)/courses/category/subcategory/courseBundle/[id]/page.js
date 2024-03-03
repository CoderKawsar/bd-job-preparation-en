import Commonbanner from "@/components/banners/Commonbanner";
import AllCourseBundleIdPage from "@/components/pages/AllCourses/AllCourseBundleIdPage";

const CourseBundleIdPage = ({ params }) => {
  const id = params?.id;
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "সব কোর্স", link: "/courses" },
    { label: " সব বান্ডল কোর্স" },
  ];
  return (
    <>
      <Commonbanner title="সব বান্ডল কোর্স" breadcrumbItems={breadcrumbItems} />
      <div className="lg:mx-14">
        <AllCourseBundleIdPage id={id} />
      </div>
    </>
  );
};

export default CourseBundleIdPage;
