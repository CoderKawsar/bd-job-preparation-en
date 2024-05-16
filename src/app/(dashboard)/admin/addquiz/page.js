"use client";

import { useEffect, useState } from "react";

import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import {
  useAddQuizPlaylistMutation,
  useDeleteQuestionsMutation,
  useGetAllQuestionsQuery,
} from "@/redux/api/questionsApi";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import Pagination from "../../Pagination";
import AdminAddQuiz from "@/components/dashboard/admin/AdminAddQuiz";
import { useRouter } from "next/navigation";
import checkPermission from "@/utils/checkPermission";

const AddQuiz = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [addQuizPlaylist] = useAddQuizPlaylistMutation();

  const {
    data: questions,
    isLoading: isFilteredQuestionLoading,
    refetch,
  } = useGetAllQuestionsQuery({ limit, page, searchTerm, exam_type: "0" });
  const allQuiz = questions?.categories?.data;

  const { data: categories } = useGetAllCategoriesQuery({
    limit,
    page,
    searchTerm,
  });
  const { data: subCategories, refetch: refetchSubCategories } =
    useGetAllSubcategoriesQuery({
      category_id: selectedCategory,
      limit,
      page,
      searchTerm,
    });
  const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategory,
    limit,
    page,
    searchTerm,
  });
  const allCourse = courses?.courses?.data;
  const { data: exams, refetch: refetchExams } = useGetAllExamsQuery({
    course_id: selectedCourse,
    limit,
    page,
    searchTerm,
    exam_type: 0,
  });
  const allExams = exams?.exams?.data;

  const [deleteQuestions] = useDeleteQuestionsMutation();
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [""],
    correct_answer: "",
    exam_id: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedExam = allExams?.find(
      (exam) => exam._id === newQuestion.exam_id
    );
    const transformedArray = newQuestion?.options?.map((option, index) => {
      const key = String.fromCharCode(97 + index);
      const obj = { [key]: option };
      return obj;
    });
    const newData = {
      question: newQuestion.question,
      options: transformedArray,
      // options: newQuestion.options,
      correct_answer: newQuestion.correct_answer,
      mark: 1,
      exam_id: selectedExam._id,
      exam_type: "0",
    };
    const res = await addQuizPlaylist(newData);
    if (res?.data) {
      toast.success("Quiz added successfully");
    } else {
      toast.error(
        "Error! not added. Check if all the questions added for this exam."
      );
    }
  };
  // (selectedExam?.id, 'this is selected exam');
  const handleDelete = async (categoryId) => {
    try {
      const res = await deleteQuestions(categoryId);
      if (res?.data) {
        toast.success("Quiz deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    refetchSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    refetchCourses();
  }, [selectedSubcategory]);

  useEffect(() => {
    refetchExams();
  }, [selectedCourse]);

  const handleOptionChange = (index, value) => {
    setNewQuestion((prevQuestion) => {
      const newOptions = [...prevQuestion.options];
      newOptions[index] = value;
      return { ...prevQuestion, options: newOptions };
    });
  };
  const handleAddOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, ""],
    }));
  };
  const handleRemoveOption = (indexToRemove) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: prevQuestion.options.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  // questions?.categories?.data
  useEffect(() => {
    refetch();
  }, [limit, page, searchTerm]);

  //check permission
  useEffect(() => {
    if (!checkPermission("exam")) {
      router.push("/");
    }
  }, []);

  const totalData = questions?.categories?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  return (
    <>
      <div className="container mx-auto mt-8">
        <form
          onSubmit={handleSubmit}
          className=" mx-auto  p-8 border rounded shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Add Quiz Questions</h2>
          <div>
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
                    <option key={category?._id} value={category?._id}>
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
                    <option key={subCategory?._id} value={subCategory?._id}>
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
                    <option key={course._id} value={course._id}>
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
                value={newQuestion.exam_id}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, exam_id: e.target.value })
                }
              >
                <option value="" disabled selected>
                  Select an Exam
                </option>
                {exams?.exams?.data.length === 0 ? (
                  <option value="" disabled>
                    No exam available
                  </option>
                ) : (
                  exams?.exams?.data?.map((exam) => (
                    <option key={exam._id} value={exam._id}>
                      {exam.title}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-600"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="optionD"
              className="block text-sm font-medium text-gray-600"
            >
              Add Options
            </label>
            {newQuestion.options.map((option, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={`option${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  Option {String.fromCharCode(65 + index)}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id={`option${index}`}
                    name={`option${index}`}
                    value={newQuestion.options[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mb-4">
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Add Option
              </button>
            </div>
          </div>
          {/* <div className="mb-4">
                        <label
                            htmlFor="correctAnswer"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Correct Answer
                        </label>
                        <select
                            id="correctAnswer"
                            name="correctAnswer"
                            value={newQuestion.correct_answer}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    correct_answer: e.target.value,
                                })
                            }
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        >
                            <option value="" disabled>
                                Select Correct Answer
                            </option>
                            <option value="a">Option A</option>
                            <option value="b">Option B</option>
                            <option value="c">Option C</option>
                            <option value="d">Option D</option>
                        </select>
                    </div> */}
          {/* Correct Answer Selection field */}
          <div className="mb-4">
            <label
              htmlFor="correctAnswer"
              className="block text-sm font-medium text-gray-600"
            >
              Correct Answer
            </label>
            <select
              id="correctAnswer"
              name="correctAnswer"
              value={newQuestion.correct_answer}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  correct_answer: e.target.value,
                })
              }
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Correct Answer
              </option>
              {newQuestion.options.map((option, index) => (
                <option key={index} value={String.fromCharCode(97 + index)}>
                  Option {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
            >
              Add Quiz
            </button>
          </div>
        </form>
      </div>

      {/* from here admin can delete quiz */}
      {/* <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 table-auto">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Question</th>
                            <th className="py-2 px-4 border-b">Option</th>
                            <th className="py-2 px-4 border-b">Correct Answer</th>
                            <th className="py-2 px-4 border-b">Exam Title</th>
                            <th className="py-2 px-4 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuestions?.map((quiz, i) => (
                            <tr key={quiz._id}>
                                <td className="py-2 px-4 border-b text-center">
                                    {i + 1}) {quiz?.question}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    {quiz?.options?.map((option, index) => (
                                        <div key={index}>
                                            {Object.keys(option)[0]}: {Object.values(option)[0]}
                                        </div>
                                    ))}
                                </td>

                                <td className="py-2 px-4 border-b text-center">{quiz?.correct_answer}</td>
                                <td className="py-2 px-4 border-b text-center">{quiz?.exam_id?.title}</td>
                                <td className="py-2 px-4 border-b text-center md:table-cell">
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                        onClick={() => handleDelete(quiz.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table> */}
      <div className="overflow-x-auto">
        <div className="text-center py-5">
          <h2 className="text-2xl font-semibold mb-4">সব কুইজ এখানে আছে</h2>
          <p>
            নির্দিষ্ট পরীক্ষার সমস্ত কুইজ দেখতে, পরীক্ষার শিরোনামে ক্লিক করুন।
          </p>
        </div>
        {isFilteredQuestionLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Question</th>
                <th className="py-2 px-4 border-b">Option</th>
                <th className="py-2 px-4 border-b">Correct Answer</th>
                <th className="py-2 px-4 border-b">Exam Title</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Change Status</th>
                <th className="py-2 px-4 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allQuiz?.map((quiz, i) => (
                <AdminAddQuiz
                  key={quiz?._id}
                  handleDelete={handleDelete}
                  refetch={refetch}
                  filteredQuestions={allQuiz}
                  quiz={quiz}
                  i={i}
                />
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default AddQuiz;
