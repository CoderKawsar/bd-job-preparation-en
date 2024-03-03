"use client";

import { useGetAllCoursesBundlesQuery } from "@/redux/api/courseApi";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";
import BundleCourses from "./BundleCourses";

const AllCourseBundleIdPage = ({ id }) => {
  const { data, isLoading, isError } = useGetAllCoursesBundlesQuery({
    sub_category_id: id,
  });

  const allBundles = data?.bundles;
  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && allBundles?.length === 0) {
    content = (
      <>
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>এখন কোন বান্ডল কোর্স নাই</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && allBundles?.length > 0) {
    content = allBundles?.map((bundle, i) => (
      <BundleCourses
        key={bundle?.total_cost}
        bundle={bundle}
        sub_category_id={id}
        i={i}
        isLast={i === allBundles.length - 1}
      />
    ));
  }

  return (
    <div className="py-10">
      <div className="">{content}</div>
    </div>
  );
};

export default AllCourseBundleIdPage;
