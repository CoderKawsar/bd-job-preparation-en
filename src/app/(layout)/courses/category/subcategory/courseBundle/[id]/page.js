import Commonbanner from "@/components/banners/Commonbanner";
import AllCourseBundleIdPage from "@/components/pages/AllCourses/AllCourseBundleIdPage";

const CourseBundleIdPage = ({ params }) => {
  const id = params?.id;
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "All Courses", link: "/courses" },
    { label: "All Course Bundles" },
  ];
  return (
    <>
      <Commonbanner
        title="All Course Bundles"
        breadcrumbItems={breadcrumbItems}
      />
      <div className="lg:mx-14">
        <AllCourseBundleIdPage id={id} />
      </div>
    </>
  );
};

export default CourseBundleIdPage;
