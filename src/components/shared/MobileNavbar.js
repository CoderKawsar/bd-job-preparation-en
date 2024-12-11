"use client";

import { authKey } from "@/constants/storage";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useGetAllCartsByUserQuery } from "@/redux/api/cartApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useGetAllCoursesQuery,
  useGetAllCoursesRoutineQuery,
} from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import avatar from "../../assets/images/avatar.png";
import Link from "next/link";
import Header1 from "./Header1";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery();
  const subCategoriesData = subCategories?.subcategories;

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState(null);

  const { books } = useSelector((state) => state.cart);

  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { userId } = getUserInfo();

  const { data } = useGetSingleUserQuery(userId);

  useEffect(() => {
    let timeoutId;

    if (hoveredCategoryId !== null) {
      timeoutId = setTimeout(() => {
        setShowSubcategories(true);
      }, 200); // Adjust the delay time (in milliseconds) as needed
    } else {
      setShowSubcategories(false);
    }

    return () => clearTimeout(timeoutId);
  }, [hoveredCategoryId]);

  // logoute

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  // set toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ul className="md:flex space-y-5  ">
        <Link
          href="/"
          className="block dark:text-black hover:text-white font-bold"
        >
          Home
        </Link>
        <li className="relative group text-center">
          <div className="flex justify-center py-2">
            <span className="cursor-pointer flex items-center   hover:text-white font-bold">
              Courses <IoIosArrowDown />
            </span>
          </div>
          {categoriesData && (
            <ul
              className={`absolute hidden min-w-[10em] px-4 text-white py-2 space-y-2 shadow-md group-hover:block text-left rounded-md transition-all duration-300 bg-bluePrimary`}
            >
              {categoriesData?.map((category) => (
                <li
                  key={category._id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCategoryId(category._id)}
                  onMouseLeave={() => setHoveredCategoryId(null)}
                >
                  <span className="cursor-pointer flex items-center">
                    {category?.title}
                    <IoIosArrowDown />
                  </span>
                  {hoveredCategoryId === category._id && subCategoriesData && (
                    <ul
                      className={`absolute top-0 left-full space-y-2 text-white bg-bluePrimary py-2 shadow-md rounded-md`}
                    >
                      {subCategoriesData
                        .filter(
                          (subCategory) =>
                            subCategory?.category_id?._id === category._id
                        )
                        .map((subCategory) => (
                          <li
                            key={subCategory?._id}
                            className="group relative"
                            onMouseEnter={() =>
                              setHoveredSubCategoryId(subCategory._id)
                            }
                            onMouseLeave={() => setHoveredSubCategoryId(null)}
                          >
                            <Link
                              href={`/courses/category/subcategory/${subCategory?._id}`}
                              className="block px-4 py-2"
                            >
                              {subCategory?.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
        <Link
          href="/contact"
          className="block dark:text-black hover:text-white font-bold"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="block dark:text-black hover:text-white font-bold"
        >
          Contact
        </Link>
        <Link
          href="/notice"
          className="block dark:text-black hover:text-white font-bold"
        >
          Notice
        </Link>

        <li className="relative group">
          <Header1 />
        </li>

        {userLoggedIn && (
          <Link
            href="/profile"
            className="block dark:text-black hover:text-white font-bold"
          >
            Dashboard
          </Link>
        )}
      </ul>
      <div className="flex justify-center">
        <Link href="/cart" className="flex items-center">
          <IoCartOutline className="text-2xl font-bold text-white" />{" "}
          <sup className="text-md font-bold text-white">{books?.length}</sup>
        </Link>
      </div>
      <div className=" ">
        {userLoggedIn ? (
          <>
            <p className="font-bold text-lg text-white">{data?.name}</p>

            <button
              onClick={logout}
              className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className=" lg:flex items-center text-white hover:text-white font-bold"
          >
            Login/ Register
          </Link>
        )}
      </div>
    </>
  );
};

export default MobileNavbar;
