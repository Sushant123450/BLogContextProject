import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Pagination() {
  const { page, handlePageChange, totalPages } = useContext(AppContext);
  return (
    <div className="w-8/12 flex justify-between max-w-[670px] mx-10 pt-1 pb-4 bottom-0 fixed bg-white">
      <div className="flex justify-between gap-10 " >
        {
          page > 1 &&
          <button className="border shadow-md py-1 px-3 rounded-xl" onClick={() => handlePageChange(page - 1)}>
            Previous
          </button>
        }
        {
          page < totalPages &&
          <button className="border shadow-md py-1 px-3 rounded-xl" onClick={() => handlePageChange(page + 1)}>
            Next
          </button>
        }
      </div>

      <div>
        <p>Page {page} of {totalPages}</p>
      </div>
    </div>
  );
}
