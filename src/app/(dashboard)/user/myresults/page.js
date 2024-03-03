'use client'
import InitialLoader from '@/components/Loader/InitialLoader';
import UserResult from '@/components/dashboard/userDashboard/UserResult';
import { useExamResultQuery } from '@/redux/api/resultApi';
import { getUserInfo } from '@/services/auth.service';
import React from 'react';

const MyAllResultPage = () => {
    const { userId } = getUserInfo()
    const { data, isError, isLoading } = useExamResultQuery({ user_id: userId });
    const allExamData = data?.exams?.data;
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
        content = <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 px-3  my-5 rounded text-lg">
            <h5>এখনও কোনো পরীক্ষা কেনা হয়নি</h5>
        </tr>;
    }

    if (!isLoading && !isError && allExamData?.length === 0) {
        content = (
            <>
                {" "}
                <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
                    <h5>এখন আপানার কোন পরীক্ষার ফলাফল নাই</h5>
                </tr>
            </>
        );
    }
    if (!isLoading && !isError && allExamData?.length > 0) {
        content = allExamData?.map((item) => (<UserResult key={item?.id} item={item} />

        ));
    }
    return (
        <div>
            <div className="border">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>

                                <th> নাম </th>
                                <th>পরিক্ষা্র নাম </th>
                                <th>পরিক্ষা্র ধরন</th>
                                <th>পরিক্ষা্র মার্ক্স</th>
                                <th>আপনার কুইজ  মার্ক্স</th>
                                <th>আপনার লিখিত  মার্ক্স</th>

                            </tr>
                        </thead>
                        <tbody>
                            {content}


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyAllResultPage;