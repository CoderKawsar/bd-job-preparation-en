"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import SinglePaymentDetails from "@/components/dashboard/userDashboard/SinglePaymentDetails";

import { useGetMyExamPaymentQuery } from "@/redux/api/examsApi";
import { getUserInfo } from "@/services/auth.service";
const MyExamPages = () => {
  const { userId } = getUserInfo();
  const { data: payments, isError, isLoading } = useGetMyExamPaymentQuery();
  const paymentsData = payments?.payments;
  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    // content = <Error />;
    content = (
      <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 px-3  my-5 rounded text-lg">
        <h5>এখনও কোনো পরীক্ষা কেনা হয়নি</h5>
      </tr>
    );
  }

  if (!isLoading && !isError && paymentsData?.length === 0) {
    content = (
      <>
        {" "}
        <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>Your don't buy any exam right now</h5>
        </tr>
      </>
    );
  }

  if (!isLoading && !isError && paymentsData?.length > 0) {
    // content = paymentsData?.map((item) => (<SinglePaymentDetails key={item?.id} item={item} />

    // ));
    content = paymentsData.map((item) => {
      if (item?.exam_id?.is_active) {
        return <SinglePaymentDetails key={item?.id} item={item} />;
      } else {
        return (
          <tr key={item?.id}>
            <td colSpan="8">
              <p className="text-red-500 font-bold">
                This quiz or written is currently inactive. please, be patient,
                when admin approved then you can give exam.
              </p>
            </td>
          </tr>
        );
      }
    });
  }

  return (
    <div>
      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Course</th>
                <th>Exam</th>
                <th>Fee</th>
                <th>Exam Type</th>
                <th>Purchase Date</th>
                <th>Trx ID</th>
                <th>Payment</th>
                <th>Questions</th>
                <th>Start Exam</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyExamPages;
