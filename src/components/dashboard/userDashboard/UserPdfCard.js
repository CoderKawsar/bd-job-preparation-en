"use client";

import { useState } from "react";
import UserPdfCardShow from "./UserPdfCardShow";

const UserPdfCard = ({ item, index }) => {
  const [openPDFModals, setOpenPDFModals] = useState([]);
  const myAllOrders = JSON.parse(item?.orders);

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

  return (
    <>
      {myAllOrders &&
        myAllOrders?.map((order, index) => (
          <UserPdfCardShow
            key={order?.book_id}
            bookId={order?.book_id}
            // onClose={() => closePDFModal(index)}
            order={order}
            index={index}
          />
        ))}

      {/* {openPDFModals?.map((isOpen, index) => (
        <div>
          <PDFViewerModal
            key={index}
            isOpen={isOpen}
            onClose={() => closePDFModal(index)}
            pdfSrc={data[index]?.pdf_link}
          />
          <p>{data[index]?.pdf_link}</p>
        </div>
      ))} */}
    </>
  );
};

export default UserPdfCard;
