import React from 'react';

export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ page, pages, onPageChange }) => {

    

  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center items-center">
     {page>1 && <button
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 mr-2 border border-gray-300 rounded-md focus:outline-none"
      >
        Prev
      </button>}
      <ul className="flex border border-gray-300 rounded-md">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 ${
              page === number ? 'bg-gray-200' : 'hover:bg-gray-100'
            } cursor-pointer`}
          >
            <span className="focus:outline-none">{number}</span>
          </li>
        ))}
      </ul>
      {page!=pages && <button
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 ml-2 border border-gray-300 rounded-md focus:outline-none"
      >
        Next
      </button>}
    </div>
  );
};

export default Pagination;
