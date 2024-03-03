

const AllBuyingCourseDetails = ({item}) => {
    const dateObject = new Date(item?.createdAt);
    const humanReadableFormatLocal = dateObject.toLocaleDateString();
    // (item)
    return (
        <tr className="hover border">
          <td>{item?.course_id?.title}</td>
          <td>{item?.course_id?.author}</td>
        <td>{item?.subscription_id
?.subscription_duration_in_months
} Months</td>
        
        <td>{item?.course_id?.sub_category_id?.category_id?.title ?item?.course_id?.sub_category_id?.category_id?.title :"not found"}</td>

        <td>{item?.course_id?.sub_category_id?.title ?item?.course_id?.sub_category_id?.title :"not found"}</td>
        
        <td>৳ {" "}{item?.amount}</td>
        <td>{humanReadableFormatLocal}</td>
  
      </tr>
    );
};

export default AllBuyingCourseDetails;