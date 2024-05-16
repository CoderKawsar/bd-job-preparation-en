import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useFieldArray } from "react-hook-form";

function CategorySelectionsInput({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const { data, isLoading, isError } = useGetAllCategoriesQuery({ limit: 200 });
  const categories = data?.categories;

  return (
    <div className="border p-4 shadow-lg">
      <label className="block text-sm font-bold mb-2">Categories:</label>
      {!isLoading &&
        !isError &&
        fields.map((field, index) => (
          <div key={field.id} className="mb-2">
            <select
              {...field}
              {...register(`categories.${index}.category`)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            <button
              className="text-red-500 font-medium"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      <button
        className="text-blue-500 font-medium"
        type="button"
        onClick={() => append({})}
      >
        Add Category
      </button>
    </div>
  );
}

export default CategorySelectionsInput;
