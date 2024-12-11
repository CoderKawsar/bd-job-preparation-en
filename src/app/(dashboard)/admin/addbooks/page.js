"use client";
import React, { useEffect, useState } from "react";
import {
  useAddBooksMutation,
  useDeleteBooksMutation,
  useGetAllBooksQuery,
} from "@/redux/api/booksApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Pagination from "../../Pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";
import SubjectSelectionsInput from "@/components/inputs/SubjectSelectionsInput";
import CategorySelectionsInput from "@/components/inputs/CategorySelectionsInput";
import SubCategorySelectionsInput from "@/components/inputs/SubCategorySelectionsInput";
import CourseSelectionsInput from "@/components/inputs/CourseSelectionsInput";
import { extractIdsFromFieldsArray } from "@/helpers/inputFormat";
import decryptLink from "@/helpers/decryptLink";

const AddBooks = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: allBooks,
    isLoading: isBooksLoading,
    refetch,
  } = useGetAllBooksQuery({
    limit,
    page,
    searchTerm,
  });
  const currentBooks = allBooks?.books?.data;

  const [deleteBooks] = useDeleteBooksMutation();
  const [addBooks] = useAddBooksMutation();

  const { register, control, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = async (data) => {
    const confirmAdd = await Swal.fire({
      title: "Are you sure that everything is correct?",
      text: "If you are sure then click on 'Yes' otherwise click on 'No/Unsure'",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No/Unsure",
    });

    if (confirmAdd.isConfirmed) {
      data.price = Number(data?.price);
      data.discount_price = Number(data?.discount_price);

      const content = { ...data };

      content.subject_id = extractIdsFromFieldsArray(
        content.subjects,
        "subject"
      );
      delete content.subjects;

      content.category_id = extractIdsFromFieldsArray(
        content.categories,
        "category"
      );
      delete content.categories;

      content.sub_category_id = extractIdsFromFieldsArray(
        content.subCategories,
        "subCategory"
      );
      delete content.subCategories;

      content.course_id = extractIdsFromFieldsArray(content.courses, "course");
      delete content.courses;

      const file = content["file"];

      const result = JSON.stringify(content);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("data", result);

      try {
        const resultData = await addBooks(formData);

        if (resultData?.data) {
          toast.success("Book created successfully");
          Swal.fire({
            title: "Added!",
            text: "Book added successfully.",
            icon: "success",
          });
        } else {
          toast.error("Error! Book not added!!!");
        }
      } catch (error) {
        toast.error(error.message);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong when adding.",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this book?",
        text: "If you are sure to delete this book, click 'Yes' otherwise click 'No'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
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
  useEffect(() => {
    if (!checkPermission("book")) {
      router.push("/");
    }
  }, []);

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
          <div className="mb-4">
            <SubjectSelectionsInput control={control} register={register} />
          </div>
          <div className="mb-4">
            <CategorySelectionsInput control={control} register={register} />
          </div>
          <div className="mb-4">
            <SubCategorySelectionsInput control={control} register={register} />
          </div>
          <div className="mb-4">
            <CourseSelectionsInput control={control} register={register} />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          >
            Add Book
          </button>
        </form>

        <h1 className="text-2xl font-bold mb-4 mt-12">Update & Delete Books</h1>
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
                    <td className="py-2 px-4 border-b">{book?.title}</td>
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
                          href={decryptLink(book?.pdf_link)}
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
                      <Link
                        href={`/admin/addbooks/edit/${book?._id}`}
                        className="bg-blue-500 text-white py-1 px-2 rounded-md"
                      >
                        Update
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b md:table-cell">
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                        onClick={() => handleDelete(book?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              totalPages={totalPages}
              currentPage={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AddBooks;
