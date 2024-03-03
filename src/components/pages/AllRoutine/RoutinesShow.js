"use client"
import Pagination from "@/app/(dashboard)/Pagination";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useEffect, useState } from "react";

const RoutinesShow = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { data: courses, isLoading, refetch } = useGetAllCoursesQuery({ limit, page, searchTerm });
    const coursesData = courses?.courses?.data;

    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Extract unique subcategories and categories
    const uniqueSubcategories = Array.from(
        new Set(
            coursesData
                ?.filter((course) => course.sub_category_id)
                .map((course) => course.sub_category_id.title)
        )
    );

    const uniqueCategories = Array.from(
        new Set(coursesData?.map((course) => course.sub_category_id?.category_id.title))
    );


    // Filter courses based on the selected subcategory and category
    const filteredCourses = coursesData?.filter(
        (course) =>
            (!selectedSubcategory || (course.sub_category_id && course.sub_category_id.title === selectedSubcategory)) &&
            (!selectedCategory || (course.sub_category_id && course.sub_category_id.category_id.title === selectedCategory))
    );


    useEffect(() => {
        refetch();
    }, [limit, page, searchTerm]);

    const totalData = courses?.courses?.meta?.total;
    const totalPages = Math.ceil(totalData / limit);


    return (
        <div>

            {isLoading && (
                <div className="text-center text-gray-500 mt-4">
                    রুটিন লোড হচ্ছে...
                </div>
            )}
 
            {
                !isLoading && <>
                    {/* Add category filter */}
                    <div className="m-8">
                        <label className="text-base font-bold">ক্যাটাগরি দিয়ে দেখুন :</label> 
                        <select
                            className="ml-2 p-2 border border-gray-300 rounded"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All</option>
                            {uniqueCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>



                    {/* Add subcategory filter */}
                    <div className="m-8">
                        <label className="text-sm font-bold">সাব ক্যাটাগরি দিয়ে দেখুন:</label>
                        <select
                            className="ml-2 p-2 border border-gray-300 rounded"
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                        >
                            <option value="">All</option>
                            {uniqueSubcategories.map((subCategory) => (
                                <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                    </div>


                </>
            }
            <div className="p-8 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {filteredCourses?.map((course) => (
                    <div key={course.id} className="p-4 rounded-lg shadow bg-indigo-100">
                        <h2 className="text-2xl font-bold mb-2 text-center">
                            {course.title}
                        </h2>

                        {course.sub_category_id && (
                            <div className="mb-2">
                                <h3 className="text-lg font-bold mb-1">
                                ক্যাটাগরি : {course.sub_category_id.category_id.title}
                                </h3>
                                <p className="text-sm mb-1">
                                সাব ক্যাটাগরি: {course.sub_category_id.title}
                                </p>
                            </div>
                        )}

                        {course.routine ? (
                            <a
                                href={course.routine}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                <button className="bg-blue-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full">
                                    রুটিন দেখুন
                                </button>
                            </a>
                        ) : (
                            <p className="text-orange-600">রুটিন শীঘ্রই আসছে</p>
                        )}
                    </div>
                ))}


            </div>

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </div>
    );
};

export default RoutinesShow;