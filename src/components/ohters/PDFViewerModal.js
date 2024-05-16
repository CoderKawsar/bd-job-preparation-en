"use client";

const PDFViewerModal = ({ isOpen, onClose, pdfSrc }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center scroll-smooth select-none z-50">
          <div className="bg-white p-4 rounded-md h-full w-full">
            <div className="bg-white  py-1 px-36 md:px-96 absolute top-0 right-0 text-green-500 font-bold flex items-center">
              <h2 className=" text-center px-12 md:px-32">TOP</h2>
              <h2 className="text-center px-12 md:px-32">SECURE</h2> 
              <img
                className="w-16 py-3"
                src="https://i.ibb.co/qNjGQnB/2592258.png"
                alt="secure"
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-6xl text-red-600 font-bold"
            >
              &times;
            </button>

            <iframe 
            src={pdfSrc}
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="no"></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewerModal;
