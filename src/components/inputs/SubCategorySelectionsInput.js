import { useFieldArray } from "react-hook-form";
import SubCategorySelectionsInputHelper from "./SubCategorySelectionsInputHelper";

function SubCategorySelectionsInput({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  return (
    <div className="border p-4 shadow-lg">
      <label className="block text-sm font-bold mb-2">Sub Categories:</label>
      {fields.map((field, index) => (
        <SubCategorySelectionsInputHelper
          key={field.id}
          control={control}
          register={register}
          field={field}
          index={index}
          remove={remove}
        />
      ))}
      <button
        className="text-blue-500 font-medium mt-2"
        type="button"
        onClick={() => append({})}
      >
        Add Sub Category
      </button>
    </div>
  );
}

export default SubCategorySelectionsInput;
