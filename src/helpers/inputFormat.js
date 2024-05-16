export const extractIdsFromFieldsArray = (FieldsArray, fieldName) =>
  FieldsArray?.filter((field) => field[fieldName])
    .map((field) => field[fieldName])
    .filter((value, index, arr) => arr.indexOf(value) === index);
