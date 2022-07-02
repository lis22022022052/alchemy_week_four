import React from "react";

export const Pagination = ({
  currentPage,
  pageKeys,
  onClickPage,
  className = "",
}) => {
  const getFirstLastButton = (isFirst = true) => {
    return (
      <button
        key={`nav-button-${isFirst ? "prev" : "next"}`}
        onClick={() => onClickPage(isFirst ? currentPage - 1 : currentPage + 1)}
        disabled={isFirst ? currentPage === 0 : !pageKeys[currentPage + 1]}
        className={`disabled:bg-gray-300 relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
      >
        {isFirst ? "Prev" : "Next"}
      </button>
    );
  };

  const getPages = () => {
    return pageKeys.map((_, i) => {
      return (
        <button
          key={`page-${i}`}
          onClick={() => onClickPage(i)}
          aria-current={currentPage === i ? "page" : ""}
          className={`${
            currentPage === i
              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          } relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer`}
        >
          {i + 1}
        </button>
      );
    });
  };

  return (
    <div
      className={`px-4 py-3 flex items-center justify-center border-gray-200 sm:px-6 mt-10 ${className}`}
    >
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {getFirstLastButton(true)}
          {getPages()}
          {getFirstLastButton(false)}
        </nav>
      </div>
    </div>
  );
};
