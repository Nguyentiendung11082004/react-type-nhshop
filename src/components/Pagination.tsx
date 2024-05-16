import React from "react";
import { NavLink, useParams } from "react-router-dom";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const { page } = useParams<{ page?: string }>();

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <NavLink
          key={i + 1}
          to={`?page=${i + 1}`}
          onClick={() => onPageChange(i + 1)}
          // className={(parseInt(page || "1") === (i + 1)) || (!page && i === 0 && currentPage === i + 1) ? "active" : ""}
          className={parseInt(page || "1") === i + 1 ? "active" : ""}
          // className={parseInt(page || "1") === (i + 1) || (!page && i === 0) ? "active" : ""}className={(parseInt(page || "1") === (i + 1)) || (!page && i === 0 && currentPage === i + 1) ? "active" : ""}
          // className={(parseInt(page || "1") === (i + 1)) || (!page && i === 0 && currentPage === i + 1) ? "active" : ""}

        >
         <button className="btn-pagination text-black"> {i + 1}</button>
        </NavLink>
      ))}
    </div>
  );
};

export default Pagination;
