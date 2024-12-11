"use client";

import { useState, useEffect } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.png";
import logoImage from "@/assets/images/logo_main.png";
import { useGetAllCartsByUserQuery } from "@/redux/api/cartApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery({ limit: 200 });
  const subCategoriesData = subCategories?.subcategories;
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const { data: cart } = useGetAllCartsByUserQuery();

  const cartLength = cart?.carts;
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
    <header className="w-full bg-white sticky top-0 left-0 right-0 z-50 border-b border-b-gray-200 shadow-lg">
      <nav
        className={`py-4  px-4 ${
          isSticky
            ? " bg-white sticky top-0 left-0 right-0 border-b duration-300"
            : ""
        }`}
      >
        {/* for large device */}
        <div className="flex justify-between items-center text-base gap-8">
          <Link
            href="/"
            className="text-lg font-semibold flex items-center space-x-2"
          >
            <Image
              src={logoImage}
              alt="BD Job Preparation"
              className=" inline-block items-center"
              width={40}
              height={0}
            />
            <span className="dark:text-cyanPrimary hover:text-bluePrimary">
              BD Job Preparation
            </span>
          </Link>

          {/* nav for large device*/}

          <ul className="md:flex space-x-5 hidden">
            <Link
              href="/"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              Home
            </Link>
            <li className="relative group">
              <span className="cursor-pointer flex items-center  hover:text-bluePrimary font-bold">
                Courses <IoIosArrowDown />
              </span>
              {categoriesData && (
                <ul
                  className={`absolute hidden min-w-[14em] px-4 text-white py-2 space-y-2 shadow-md group-hover:block text-left rounded-md transition-all duration-300 bg-bluePrimary`}
                >
                  {categoriesData?.map((category) => (
                    <li
                      key={category._id}
                      className="group relative hover:text-yellowPrimary"
                      onMouseEnter={() => setHoveredCategoryId(category._id)}
                      onMouseLeave={() => setHoveredCategoryId(null)}
                    >
                      <Link href={`/courses/category/${category?._id}`}>
                        <span className="cursor-pointer flex items-center">
                          {category?.title}
                          <IoIosArrowDown />
                        </span>
                      </Link>
                      {hoveredCategoryId === category._id &&
                        subCategoriesData && (
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
                                  className="group relative hover:text-yellowPrimary"
                                  onMouseEnter={() =>
                                    setHoveredSubCategoryId(subCategory._id)
                                  }
                                  onMouseLeave={() =>
                                    setHoveredSubCategoryId(null)
                                  }
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
              href="/about"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              Contact
            </Link>

            <Link
              href="/routines"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              Class Routine
            </Link>
            <Link
              href="/notice"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              Notice
            </Link>

            {userLoggedIn && (
              <Link
                href="/profile"
                className="block dark:text-black hover:text-bluePrimary font-bold"
              >
                Dashboard
              </Link>
            )}
          </ul>

          {/* btn for large device */}
          <div className="space-x-4 hidden lg:flex items-center">
            {/* <ToggleTheme /> */}

            <Link href="/cart" className="flex items-center">
              <IoCartOutline className="text-2xl font-bold" />{" "}
              {/* {userLoggedIn && (
                <sup className="text-md font-bold">{cartLength?.length}</sup>
              )} */}
              <sup className="text-md font-bold">{books?.length}</sup>
            </Link>

            {/* <!-- Dropdown menu --> */}

            {userLoggedIn ? (
              <>
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    id="dropdownHoverButton"
                    className=" bg-gray-200 rounded-full p-2"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <Image
                      src={avatar}
                      width={20}
                      height={50}
                      className="rounded "
                      alt="Profile"
                    />
                  </button>

                  <div
                    className={`${
                      isOpen ? "block" : "hidden"
                    } absolute z-10 mt-4 w-44 left-[-130px] bg-gray-200 divide-y divide-gray-100 rounded-lg shadow `}
                  >
                    <ul className="py-4 pl-5 text-sm text-gray-700 dark:text-black">
                      <>
                        <li>
                          <p className="text-lg font-bold">{data?.name}</p>
                        </li>
                        <li>
                          <Link
                            href="/profile"
                            className="block  py-2 text-lg hover:bg-gray-100 "
                          >
                            Profile
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={logout}
                            className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center text-cyanPrimary hover:text-bluePrimary font-bold"
              >
                Login/Register
              </Link>
            )}
          </div>

          {/* menu btn for only mobile devices */}
          <div className="md:hidden">
            <button
              className=" text-bluePrimary  focus:outline-none focus:text-gray-500"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaXmark className="h-6 w-6 " /> : <FaBars />}
            </button>
          </div>
        </div>
        {/* nav items for mobile devices */}
        <div
          className={`space-y-4  mt-16 py-7 bg-bluePrimary ${
            isMenuOpen
              ? "block fixed top-0 right-0 left-0 text-center"
              : "hidden"
          }`}
        >
          {/* <ToggleTheme /> */}
          <MobileNavbar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
