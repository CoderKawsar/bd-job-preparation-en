"use client";
import { useState } from "react";
import Link from "next/link";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const Header1 = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery();
  const subCategoriesData = subCategories?.subcategories;

  const { data: courses } = useGetAllCoursesQuery();
  const coursesData = courses?.courses?.data;

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState(null);
  const [hoveredCourseId, setHoveredCourseId] = useState(null);

  return (
    <>
      <div className="flex justify-center">
        <span className="cursor-pointer flex items-center lg:hover:text-bluePrimary sm:hover:text-white font-bold">
          <Link href="/routines">Class Routine</Link>
        </span>
      </div>
      {/*  */}
    </>
  );
};

export default Header1;
