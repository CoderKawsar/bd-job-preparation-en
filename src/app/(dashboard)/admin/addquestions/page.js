"use client";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import {
  useAddQuizPlaylistMutation,
  useDeleteQuestionsMutation,
  useGetAllQuestionsQuery,
} from "@/redux/api/questionsApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Pagination from "../../Pagination";
import AdminChangeWrittenStatus from "@/components/dashboard/admin/AdminChangeWrittenStatus";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";

const AddQuestions = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [question, setQuestion] = useState(null);
  const [mark, setMark] = useState(null);
  const [addQuizPlaylist] = useAddQuizPlaylistMutation();


  const { data: categories } = useGetAllCategoriesQuery({ limit, page, searchTerm });
  const { data: subCategories, refetch: refetchSubCategories } =
    useGetAllSubcategoriesQuery({
      category_id: selectedCategory,
      limit, page, searchTerm,
    });
  const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategory,
    limit, page, searchTerm,
  });

  const allCourse = courses?.courses?.data;

  const { data: exams, refetch: refetchExams } = useGetAllExamsQuery({
    course_id: selectedCourse,
    exam_type: 1,
    limit, page, searchTerm,
  });


  const allExams = exams?.exams?.data;


  const { data: questions, refetch } = useGetAllQuestionsQuery({ limit, page, searchTerm });

  const allQuiz = questions?.categories?.data;
  const filteredQuestions = allQuiz?.filter((quiz) => quiz?.exam_type === "1");
  const [deleteQuestions] = useDeleteQuestionsMutation();



  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);


  const totalData = questions?.categories?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);


  useEffect(() => {
    const fetchSubCategory = async () => {
      await refetchSubCategories({ category_id: selectedCategory });
    };
    fetchSubCategory();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      await refetchCourses({ sub_category_id: selectedSubcategory });
    };
    fetchSubCategories();
  }, [selectedSubcategory]);

  useEffect(() => {
    const fetchExams = async () => {
      await refetchExams({ course_id: selectedCourse });
    };
    fetchExams();
  }, [selectedCourse]);

  //check permission
  useEffect(()=>{
    if(!checkPermission('exam')){

     router.push('/')
    }

  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const convertMark = parseInt(mark);

    try {
      const res = await addQuizPlaylist({
        question,
        convertMark,
        exam_type: "1",
        exam_id: selectedExam,
      });

      if (res) {
        toast.success("question added successfully");
      }
    } catch (error) {
      toast.error("An error occurred:", error);
    }
  };
  const handleStatusChange = async () => {
    try {
      const result = await updateStatusChange({
        id: examId,
        is_active: !activeStatus
      })
      if (result) {
        toast.success("Successfully change the status")
      }
      refetchExams()
    } catch (error) {
      console.error("Error Updating status", error)

    }
  }
  // question delete function
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "আপনি এই প্রশ্নটি মুছে ফেলার বিষয়ে নিশ্চিত?",
        text: "আপনি যদি এটি মুছতে চান তবে 'হ্যাঁ মুছুন' বোতামে ক্লিক করুন অন্যথায় 'বাতিল' বোতামে ক্লিক করুন।",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "হ্যাঁ মুছুন",
        cancelButtonText: "বাতিল",
      });

      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteQuestions(id);
        // (res?.data)

        if (res?.data?._id === id) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          // Something went wrong with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };;

  return (
    <>
      <div className="container mx-auto my-8">
        <form
          onSubmit={handleSubmit}
          className=" mx-auto bg-white p-8 border rounded shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Add Broad questions</h2>
          {/* Category selection field */}
          <div className="mb-4">
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-600"
            >
              Categories
            </label>
            <select
              id="categories"
              name="categories"
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled selected>
                Select a category
              </option>
              {categories &&
                categories?.categories?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Sub category selection field */}
          <div className="mb-4">
            <label
              htmlFor="subcategories"
              className="block text-sm font-medium text-gray-600"
            >
              Subcategories
            </label>
            <select
              id="subcategories"
              name="subcategories"
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
              disabled={!selectedCategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="" disabled selected>
                Select a sub category
              </option>
              {!!subCategories &&
                subCategories?.subcategories?.map((subCategory) => (
                  <option key={subCategory?.id} value={subCategory?.id}>
                    {subCategory?.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Course selection field */}
          <div className="mb-4">
            <label
              htmlFor="courses"
              className="block text-sm font-medium text-gray-600"
            >
              Select Courses
            </label>
            <select
              id="courses"
              name="courses"
              disabled={!selectedSubcategory}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled selected>
                Select a course
              </option>
              {allCourse?.length === 0 ? (
                <option value="" disabled>
                  No courses available
                </option>
              ) : (
                allCourse?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Exam Selection field */}
          <div className="mb-4">
            <label
              htmlFor="exam"
              className="block text-sm font-medium text-gray-600"
            >
              Select Exam
            </label>
            <select
              id="exam"
              name="exam"
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
              disabled={!selectedCourse}
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              <option value="" disabled selected>
                Select an Exam
              </option>
              {allExams?.length === 0 ? (
                <option value="" disabled>
                  No exam available
                </option>
              ) : (
                allExams?.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam?.title}
                  </option>
                ))
              )}
            </select>
          </div>


          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-600"
            >
              Question
            </label>
            <input
              required
              type="text"
              id="question"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mark"
              className="block text-sm font-medium text-gray-600"
            >
              Mark
            </label>
            <input
              required
              type="number"
              id="mark"
              name="mark"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
            >
              Add Question
            </button>
          </div>
        </form>

        <div className="overflow-x-auto mt-10">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Question</th>
                <th className="py-2 px-4 border-b">Mark</th>
                <th className="py-2 px-4 border-b">Exam Title</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Change Status</th>
                <th className="py-2 px-4 border-b">Update</th>
                <th className="py-2 px-4 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions?.map((quiz, i) => (
                <AdminChangeWrittenStatus key={quiz?._id} refetch={refetch} quiz={quiz} i={i} handleDelete={handleDelete}></AdminChangeWrittenStatus>
              ))}
            </tbody>
          </table>

          <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />

        </div>
      </div>
    </>
  );
};

export default AddQuestions;