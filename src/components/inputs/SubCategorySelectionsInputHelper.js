import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useEffect, useState } from "react";

function SubCategorySelectionsInputHelper({
  control,
  register,
  field,
  index,
  remove,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.categories;

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories]);

  const {
    data: subCategoriesData,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
    refetch: refetchSubCategory,
  } = useGetAllSubcategoriesQuery({
    category_id: selectedCategory,
    limit: 50,
  });
  const subCategories = subCategoriesData?.subcategories;

  useEffect(() => {
    if (selectedCategory) {
      refetchSubCategory();
    }
  }, [selectedCategory]);

  return (
    <div key={field.id}>
      <div className="grid grid-cols-2 gap-x-4">
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
        <select
          {...field}
          {...register(`subCategories.${index}.subCategory`)}
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

export default SubCategorySelectionsInputHelper;
