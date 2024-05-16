import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi";
import { useFieldArray } from "react-hook-form";

function SubjectSelectionsInput({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const { data, isLoading, isError } = useGetAllSubjectsQuery({ limit: 200 });
  const subjects = data?.subjects;

  return (
    <div className="border p-4 shadow-lg">
      <label className="block text-sm font-bold mb-2">Subjects:</label>
      {!isLoading &&
        !isError &&
        fields.map((field, index) => (
          <div key={field.id} className="mb-2">
            <select
              {...field}
              {...register(`subjects.${index}.subject`)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.title}
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
        Add Subject
      </button>
    </div>
  );
}

export default SubjectSelectionsInput;
