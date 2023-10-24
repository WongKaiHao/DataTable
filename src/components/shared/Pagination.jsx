import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <ul style={{ listStyle: "none", display: "inline-block", padding: 0, margin: 0 }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <li
            key={pageNumber}
            style={{ display: "inline", marginRight: "5px" }}
          >
            <a
              href="#"
              onClick={() => onPageChange(pageNumber)}
              style={{
                display: "inline-block",
                padding: "5px 10px",
                textDecoration: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#333",
                backgroundColor: pageNumber === currentPage ? "#007bff" : "#fff", // Active page color
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
