'use client'
import Commonbanner from "@/components/banners/Commonbanner";
import CourseDetailsData from "./CourseDetailsData";
import { useGetSingleCourseQuery } from "@/redux/api/courseApi";


const CourseDetails = ({id}) => {

    const {data,isLoading,isError} = useGetSingleCourseQuery(id);
    

    const breadcrumbItems = [
        { label: 'হোম', link: '/' },
        { label: ' কোর্সসমূহ ',link: '/courses' },
        { label: ' কোর্স  ডিটেইলস ', }
      ];
  return (
    <div>
         <Commonbanner title="কোর্স  ডিটেইলস" breadcrumbItems={breadcrumbItems}/>
            <CourseDetailsData data={data} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default CourseDetails