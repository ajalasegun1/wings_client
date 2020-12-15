import React from "react";

function Pagination({ adsPerPage, totalAd, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalAd / adsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav style={{ alignItems: "center" }}>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <span
                className="page-link paginationHover"
                onClick={() => paginate(number)}
              >
                {number}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
