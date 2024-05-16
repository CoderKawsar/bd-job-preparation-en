import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useEffect, useState } from "react";

function CourseSelectionsInputHelper({
  control,
  register,
  field,
  index,
  remove,
}) {
  // defining states for selecting category and subCategory
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // fetching all categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.categories;

  // when all cateogries fetched, select the first category as selected category
  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories]);

  // fetching all subCategories
  const {
    data: subCategoriesData,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetAllSubcategoriesQuery({
    category_id: selectedCategory,
    limit: 50,
  });
  const subCategories = subCategoriesData?.subcategories;

  // when subCateogries fetched, select the first category as selected subCategory
  useEffect(() => {
    if (subCategories?.length > 0) {
      setSelectedSubCategory(subCategories[0]._id);
    }
  }, [subCategories]);

  // if a category is selected, refetch subCategories
  useEffect(() => {
    if (selectedCategory) {
      refetchSubCategories();
      refetchCourses();
    }
  }, [selectedCategory]);

  // fetching all courses
  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: coursesError,
    refetch: refetchCourses,
  } = useGetAllCoursesQuery({
    sub_category_id: selectedSubCategory,
    limit: 50,
  });
  const courses = coursesData?.courses?.data;

  // if a subCategory is selected, refetch courses
  useEffect(() => {
    if (selectedSubCategory) {
      refetchCourses();
    }
  }, [selectedSubCategory]);

  return (
    <div key={field.id}>
      <div className="grid grid-cols-4 gap-x-4">
        <div>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Sub-Category</option>
            {subCategories?.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.title}
              </option>
            ))}
          </select>
        </div>
        <select
          {...field}
          {...register(`courses.${index}.course`)}
          className="w-full border border-gray-300 p-2 rounded-md col-span-2"
        >
          <option value="">Select Course</option>
          {courses?.length > 0 &&
            courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
        </select>
      </div>
      <button
        className="text-red-500 font-medium"
        type="button"
        onClick={() => remove(index)}
      >
        Remove
      </button>
    </div>
  );
}

export default CourseSelectionsInputHelper;
