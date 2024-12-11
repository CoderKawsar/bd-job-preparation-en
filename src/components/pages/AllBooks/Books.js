"use client";

import Link from "next/link";
import BookSectionCard from "./course/BookSectionCard";
import InitialLoader from "@/components/Loader/InitialLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";
import { useState } from "react";

const Books = ({ books }) => {
  const [openPDFModals, setOpenPDFModals] = useState([]);
  const [showPDFModal, setShowPDFModal] = useState(false);

  const openPDFModal = (index) => {
    const updatedModals = [...openPDFModals];
    updatedModals[index] = true;
    setOpenPDFModals(updatedModals);
  };

  const closePDFModal = (index) => {
    const updatedModals = [...openPDFModals];
    updatedModals[index] = false;
    setOpenPDFModals(updatedModals);
  };

  const booksData = books;

  const breakpoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    786: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  content = booksData?.map((item, index) => (
    <SwiperSlide key={item?._id}>
      <BookSectionCard item={item} onOpenPDFModal={() => openPDFModal(index)} />
    </SwiperSlide>
  ));
  return (
    <div className="lg:px-14  px-3  py-20">
      <div className="flex gap-5 py-5">
        <h2 className="text-2xl font-bold px-2  rounded ">Our Books</h2>
        <Link
          href="/books"
          className="mb-5 bg-bluePrimary hover:bg-cyanPrimary w-44 text-white px-7 py-3 rounded transition-all duration-500 delay-200"
        >
          View All
        </Link>
      </div>
      <div></div>
      <Swiper
        // pagination={{
        //   type: 'progressbar',
        // }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={breakpoints}
        className="mySwiper"
      >
        {content}
      </Swiper>

      {openPDFModals.map((isOpen, index) => (
        <PDFViewerModal
          key={index}
          isOpen={isOpen}
          onClose={() => closePDFModal(index)}
          pdfSrc={data?.books?.data[index]?.sample_pdf_link}
        />
      ))}
    </div>
  );
};

export default Books;
