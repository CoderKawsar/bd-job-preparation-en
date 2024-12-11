const UserResult = ({ item }) => {
  const examId = item?.exam_id?._id;
  const totalObtainedMarks = item?.question_mark?.reduce(
    (total, mark) => total + mark?.mark_obtained,
    0
  );

  item?.user_id;
  return (
    <tr>
      <td className="py-2  px-1 border-b md:table-cell flex">
        {item?.user_id?.name}
      </td>
      <td className="py-2  px-1 border-b md:table-cell flex">
        {item?.exam_id ? item.exam_id.title : "N/A"}
      </td>
      <td className="py-2  px-1 border-b md:table-cell flex">
        {item?.exam_id?.exam_type === "0" ? "Quiz" : "Questions"}
      </td>
      <td className="py-2  px-1 border-b md:table-cell flex">
        {item?.total_marks}
      </td>
      <td className="py-2  px-1 border-b md:table-cell flex">
        {item?.total_correct_answer}
      </td>
      <td className="py-2  px-1 border-b md:table-cell flex">
        {totalObtainedMarks}
      </td>
    </tr>
    // <div>
    //   <div className="border">
    //     <div className="overflow-x-auto">
    //       <table className="table">
    //         {/* head */}
    //         <thead>
    //           <tr>

    //             <th>পরিক্ষা্র নাম </th>
    //             <th>পরিক্ষা্র ধরন</th>
    //             <th>পরিক্ষা্র মার্ক্স</th>
    //             <th>আপনার মার্ক্স</th>

    //           </tr>
    //         </thead>
    //         <tbody>
    //           {allExamData?.map((item, index) => (

    //             <tr key={index} className="hover">

    //             </tr>
    //           ))
    //           }

    //         </tbody>
    //       </table>
    //     </div>
    //   </div>

    // </div>
  );
};

export default UserResult;
