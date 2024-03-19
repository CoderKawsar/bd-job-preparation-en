"use client";

import SubCategoryBooks from "@/components/ui/Home/SubCategoryBooks";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";

function CategoryBooksShow({ params }) {
  const {
    data: category,
    isLoading,
    isError,
  } = useGetSingleCategoryQuery(params.category_id);

  let content;
  if (!isLoading && (!category || !category?.subCategories?.length > 0))
    content = <p className="p-4">No books found</p>;
  if (!isLoading && isError)
    content = <p className="text-red-400 p-4">There is an error!</p>;
  if (!isLoading && category && category?.subCategories?.length > 0)
    content = (
      <div>
        {category?.subCategories?.map((subCategory) => (
          <div key={subCategory._id}>
            <div className="flex justify-center">
              <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-6">{`${category?.title} - ${subCategory?.title}`}</h2>
            </div>
            <SubCategoryBooks sub_category_id={subCategory?._id} />
          </div>
        ))}
      </div>
    );

  return <div>{content}</div>;
}

export default CategoryBooksShow;
