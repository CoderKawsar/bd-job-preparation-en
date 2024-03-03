"use client";
import React, { useEffect, useState } from "react";
import {
  useAddBooksMutation,
  useDeleteBooksMutation,
  useGetAllBooksQuery,
} from "@/redux/api/booksApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import Swal from "sweetalert2";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import Pagination from "../../Pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";

const AddBooks = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  const { data: allBooks, isLoading: isBooksLoading, refetch} = useGetAllBooksQuery({
    limit,
    page,
    searchTerm,
  });

  const currentBooks = allBooks?.books?.data;

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
  } = useGetAllCategoriesQuery({limit, page, searchTerm});

  const {
    data: subcategories,
    isLoading: isLoadingSubcategories,
    isError: isErrorSubcategories,
  } = useGetAllSubcategoriesQuery({
    category_id: selectedCategories,
    limit, page, searchTerm,
  });


  const allSubcategory = subcategories?.subcategories;


  const { data } = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategories,
    limit, page, searchTerm,
  });



  const allCourse = data?.courses?.data;
  const [repetitionData, setRepetitionData] = useState([{ category_id: '', subcategory_id: '', course_id: '' }]);

  const addRepetition = () => {
    setRepetitions(repetitions + 1);
    const newRepetition = { category_id: '', subcategory_id: '', course_ids: [''] };
    setRepetitionData([...repetitionData, newRepetition]);
  };

  const removeRepetition = (index) => {
    setRepetitions(repetitions - 1);
    const updatedRepetitionData = [...repetitionData];
    updatedRepetitionData.splice(index, 1);
    setRepetitionData(updatedRepetitionData);
  };


  const { register, handleSubmit, reset, watch, setValue } = useForm();


  const onSubmit = async (data) => {
    data.price = Number(data?.price);
    data.discount_price = Number(data?.discount_price);

    const content = { ...data };

    const file = content["file"];

    content.course_id = data?.categories?.map((category) => category.course_id) || [];
    const { categories, ...othersData } = content;
   
    const result = JSON.stringify(othersData);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);
   
    try {
      const resultData = await addBooks(formData);

      if (resultData) {
        toast.success("Book created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "আপনি এই বইটি মুছে ফেলার বিষয়ে নিশ্চিত?",
        text: "আপনি যদি এটি মুছতে চান তবে 'হ্যাঁ মুছুন' বোতামে ক্লিক করুন অন্যথায় 'বাতিল' বোতামে ক্লিক করুন।",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "হ্যাঁ মুছুন",
        cancelButtonText: "বাতিল",
      });

      if (result.isConfirmed) {
        const res = await deleteBooks(id);

        if (res?.data?._id === id) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  
  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);
  //check permission
  useEffect(()=>{
    if(!checkPermission('book')){

     router.push('/')
    }

  },[])

  const totalData = allBooks?.books?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

return (
    <>
      <div className="container mx-auto  p-6">
        <h2 className="text-2xl font-semibold mb-6">Add Book</h2>

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
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          >
            Add Book
          </button>
        </form>

        <h1 className="text-2xl font-bold mb-4 mt-12">
        Update & Delete Books
        </h1>
        {isBooksLoading ? (
          <p className="text-center text-xl">Loading books...</p>
        ) : (
          <div className="overflow-x-auto mt-10">
            <table className=" min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Writer</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Discount Price</th>
                  <th className="py-2 px-4 border-b">Cover Page</th>
                  <th className="py-2 px-4 border-b">Format</th>
                  <th className="py-2 px-4 border-b">PDF Link</th>
                  <th className="py-2 px-4 border-b">Update</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks?.map((book, i) => (
                  <tr key={book._id}>
                    <td className="py-2 px-4 border-b">
                      {book?.title}
                    </td>
                    <td className="py-2 px-4 border-b">{book?.writer}</td>
                    <td className="py-2 px-4 border-b">{book?.price}</td>
                    <td className="py-2 px-4 border-b">
                      {book?.discount_price}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={book.cover_page}
                        alt={`Cover for ${book.title}`}
                        className="w-10 h-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{book.format}</td>
                    <td className="py-2 px-4 border-b">
                      {book.format === "pdf" ? (
                        <a
                          href={book.pdf_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      ) : (
                        "Not Applicable"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b md:table-cell">
                      <Link href={`/admin/addbooks/edit/${book?._id}`} className="bg-blue-500 text-white py-1 px-2 rounded-md">
                        Update
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b md:table-cell">
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                        onClick={() => handleDelete(book?.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

     <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/>

          </div>
        )}
      </div>
    </>
  );
};

export default AddBooks;
