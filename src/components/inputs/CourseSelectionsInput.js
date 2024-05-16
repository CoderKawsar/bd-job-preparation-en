import { useFieldArray } from "react-hook-form";
import CourseSelectionsInputHelper from "./CourseSelectionsInputHelper";

function CourseSelectionsInput({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  return (
    <div className="border p-4 shadow-lg">
      <label className="block text-sm font-bold mb-2">Courses:</label>
      {fields.map((field, index) => (
        <CourseSelectionsInputHelper
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
        Add Course
      </button>
    </div>
  );
}

export default CourseSelectionsInput;
