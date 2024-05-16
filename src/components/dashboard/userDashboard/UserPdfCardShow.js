"use client";
import { useGetSingleBookQuery } from "@/redux/api/booksApi";
import Image from "next/image";
import { useState } from "react";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";
import decryptLink from "@/helpers/decryptLink";

const UserPdfCardShow = ({ bookId, order, index }) => {
  const { data } = useGetSingleBookQuery(bookId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenPDFModal = () => {
    setIsModalOpen(true);
  };

  const onClosePDFModal = () => {
    setIsModalOpen(false);
  };

  if (data?.format === "pdf") {
    return (
      <>
        <div className="border rounded">
          <Image
            src={data?.cover_page}
            width={400}
            alt="book-img"
            height={40}
          />
          <div className="px-5 mb-6">
            <h2 className="text-xl font-bold py-4">
              {data?.title ? data?.title : "বইটি নাই"}
            </h2>
            <button
              onClick={onOpenPDFModal}
              className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3"
            >
              বইটি পড়ুন
            </button>
          </div>
        </div>
        {isModalOpen && (
          <PDFViewerModal
            isOpen={isModalOpen}
            pdfSrc={data?.pdf_link ? decryptLink(data?.pdf_link) : ""}
            onClose={onClosePDFModal}
          />
        )}
      </>
    );
  }

  // return (
  //   <>
  //     <div className="border rounded">
  //       <Image src={data?.cover_page} width={400} alt="book-img" height={40} />
  //       <div className="px-5 mb-6">
  //         <h2 className="text-xl font-bold py-4">
  //           {data?.title ? data?.title : "বইটি নাই"}
  //         </h2>
  //         <button
  //           onClick={onOpenPDFModal}
  //           className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3"
  //         >
  //           বইটি পড়ুন
  //         </button>
  //       </div>
  //     </div>
  //     {isModalOpen && (
  //       <PDFViewerModal isOpen={isModalOpen} pdfSrc={data?.pdf_link} onClose={onClosePDFModal} />
  //     )}

  //   </>
  // );
};

export default UserPdfCardShow;
