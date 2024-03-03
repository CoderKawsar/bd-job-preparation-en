"use client";
import React, { useState } from "react";
import {
    useAddBooksMutation,
    useDeleteBooksMutation,
} from "@/redux/api/booksApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import Swal from "sweetalert2";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";

const AddBooks = () => {
    const [deleteBooks] = useDeleteBooksMutation();
    const [addBooks] = useAddBooksMutation();
    const [repetitions, setRepetitions] = useState(1);
    const [fields, setFields] = useState([{ category_id: '', subcategory_id: '', course_id: '' }]);
    const [selectedCategories, setSelectedCategories] = useState(Array.from({ length: 1 }, () => ''));
    const [selectedSubcategories, setSelectedSubcategories] = useState(Array.from({ length: 1 }, () => ''));
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
    } = useGetAllCategoriesQuery();

    const {
        data: subcategories,
        isLoading: isLoadingSubcategories,
        isError: isErrorSubcategories,
    } = useGetAllSubcategoriesQuery({
        category_id: selectedCategories,
    });
    const allSubcategory = subcategories?.subcategories;
    const { data } = useGetAllCoursesQuery({
        sub_category_id: selectedSubcategories,
    });
    const allCourse = data?.courses?.data;
    // (variable);

    // ... (other state variables)
    const [repetitionData, setRepetitionData] = useState([{ category_id: '', subcategory_id: '', course_id: '' }]);

    const addRepetition = () => {
        setRepetitions(repetitions + 1);

        // Create a new repetition object with initial values
        const newRepetition = { category_id: '', subcategory_id: '', course_ids: [''] };
        setRepetitionData([...repetitionData, newRepetition]);
    };

    // const addRepetition = () => {
    //     setRepetitions(repetitions + 1);

    //     // Create a new repetition object with initial values
    //     const newRepetition = { category_id: '', subcategory_id: '', course_id: '' };
    //     setRepetitionData([...repetitionData, newRepetition]);
    // };

    const removeRepetition = (index) => {
        setRepetitions(repetitions - 1);

        // Remove the repetition object at the specified index
        const updatedRepetitionData = [...repetitionData];
        updatedRepetitionData.splice(index, 1);
        setRepetitionData(updatedRepetitionData);
    };


    const { register, handleSubmit, reset, watch, setValue } = useForm();

    // const onSubmit = async (data) => {
    //     (data, ' this is just data console log');
    //     data.price = Number(data?.price);
    //     data.discount_price = Number(data?.discount_price);

    //     const content = { ...data };
    //     const file = content["file"];
    //     const result = JSON.stringify(content);
    //     const formData = new FormData();
    //     formData.append("file", file[0]);
    //     formData.append("data", result);
    //     (formData);
    //     try {
    //         const resultData = await addBooks(formData);

    //         if (resultData) {
    //             toast.success("Book created successfully");
    //         }
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };
    const onSubmit = async (data) => {
        // (data);
        data.price = Number(data?.price);
        data.discount_price = Number(data?.discount_price);

        const content = { ...data };
        (data);

        const file = content["file"];
        // (file)
        // delete content['file'];
        const result = JSON.stringify(content);
        // (result, "json");
        const course_id = data?.categories?.map((category) => category.course_id) || [];
        (course_id, 'this is course id');
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("data", result);
        (formData, 'this is form data');
        // (formData, 'formdaata')
        try {
            const resultData = await addBooks(formData, course_id);

            if (resultData) {
                toast.success("Book created successfully");
            }
            // (resultData, ' from add category async')
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="container mx-auto  p-6">
                <h2 className="text-2xl font-semibold mb-6">Add Test Book</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Book Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            {...register("title", { required: true })}
                            required
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="writer"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Book Author:
                        </label>
                        <input
                            type="text"
                            id="writer"
                            name="writer"
                            {...register("writer", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Price:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            {...register("price", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="discount_price"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Discount Price:
                        </label>
                        <input
                            type="number"
                            id="discount_price"
                            name="discount_price"
                            {...register("discount_price", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            {...register("description", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="pdf_link"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Sample PDF Link:
                        </label>
                        <input
                            type="text"
                            id="sample_pdf_link"
                            name="sample_pdf_link"
                            {...register("sample_pdf_link", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="format"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Format:
                        </label>
                        <select
                            id="format"
                            name="format"
                            {...register("format", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        >
                            <option value="hard copy">Hard Copy</option>
                            <option value="pdf">PDF</option>
                        </select>
                    </div>

                    {/* Conditionally render PDF Link input based on the selected format */}
                    {watch("format") === "pdf" && (
                        <div>
                            <label
                                htmlFor="pdf_link"
                                className="block text-sm font-medium text-gray-600"
                            >
                                PDF Link:
                            </label>
                            <input
                                type="text"
                                id="pdf_link"
                                name="pdf_link"
                                {...register("pdf_link", { required: true })}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>
                    )}
                    {repetitionData.map((repetition, repetitionIndex) => (
                        <div key={repetitionIndex}>
                            {fields.map((field, index) => (
                                <div key={index} className="mb-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold mb-2">Category</label>
                                        <select
                                            {...register(`categories.${repetitionIndex}.category_id`)}
                                            onChange={(e) => {
                                                const updatedCategories = [...selectedCategories];
                                                updatedCategories[repetitionIndex] = e.target.value;
                                                setSelectedCategories(updatedCategories);

                                                // Reset subcategory and course when the category changes
                                                setValue(`categories.${repetitionIndex}.sub_category_id`, '');
                                                setValue(`categories.${repetitionIndex}.course_id`, '');
                                            }}
                                            value={selectedCategories[repetitionIndex]}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                        >
                                            <option value="" disabled>
                                                Select a category
                                            </option>
                                            {categories?.categories?.map((category) => (
                                                <option key={category?.id} value={category?.id}>
                                                    {category?.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold mb-2">Sub Category</label>
                                        <select
                                            {...register(`categories.${repetitionIndex}.sub_category_id`)}
                                            disabled={!selectedCategories[repetitionIndex]}
                                            onChange={(e) => {
                                                const updatedSubcategories = [...selectedSubcategories];
                                                updatedSubcategories[repetitionIndex] = e.target.value;
                                                setSelectedSubcategories(updatedSubcategories);

                                                // Reset course when the subcategory changes
                                                setValue(`categories.${repetitionIndex}.course_id`, '');
                                            }}
                                            value={selectedSubcategories[repetitionIndex]}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                        >
                                            <option value="" disabled>
                                                Select a subcategory
                                            </option>
                                            {allSubcategory?.map((subCategory) => (
                                                <option key={subCategory?.id} value={subCategory?.id}>
                                                    {subCategory?.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="">
                                        <label className="block text-sm font-bold mb-2">Course</label>
                                        <select
                                            disabled={!selectedSubcategories[repetitionIndex]}
                                            {...register(`categories.${repetitionIndex}.course_id`)}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                        >
                                            {allCourse?.length === 0 ? (
                                                <option value="" disabled>
                                                    No courses available
                                                </option>
                                            ) : (
                                                allCourse?.map((course) => (
                                                    <option key={course.id} value={course.id}>
                                                        {course?.title}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                    <button type="button" onClick={() => removeRepetition(index)} className="text-red-500 mt-2">
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}


                    <button type="button" onClick={addRepetition} className="text-blue-500 mt-2">
                        Add More
                    </button>

                    <div>
                        <label
                            htmlFor="cover_page"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Cover page Photo:
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            {...register("file", { required: true })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Add Book
                    </button>
                </form>


            </div>
        </>
    );
};

export default AddBooks;





