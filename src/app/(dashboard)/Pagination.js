import React from "react";

const Pagination = ({ totalPages, currentPage, setPage }) => {
  return (
    <div className="flex items-center justify-center my-4 ml-64 md:ml-0">
      <div className="flex items-center">
        <button
          className="mx-2 px-4 py-2 border rounded-md"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {(() => {
          const buttons = [];
          for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const isPageInRange =
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2);

            const isDistantPage =
              (pageNumber === 4 && currentPage <= 3) ||
              (pageNumber === totalPages - 3 && currentPage >= totalPages - 2);

            buttons.push(
              <React.Fragment key={pageNumber}>
                {isPageInRange || isDistantPage ? (
                  <button
                    className={`mx-2 px-4 py-2 border rounded-md ${
                      pageNumber === currentPage ? "bg-gray-500 text-white" : ""
                    }`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ) : null}

                {isDistantPage && <span className="mx-2">...</span>}
              </React.Fragment>
            );
          }
          return buttons;
        })()}

        <button
          className="mx-2 px-4 py-2 border rounded-md"
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
