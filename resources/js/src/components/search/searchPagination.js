import React from "react";
import { Link } from "react-router-dom";

export default function searchPagination({ q, currentpage, pagecount }) {
  return (
    <div className="col-10 mx-auto pl-0">
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentpage === 1 ? "disabled" : ""}`}>
            <Link
              className="page-link bg-dark text-white "
              to={`/search/${q}/${currentpage - 1}`}
            >
              Previous
            </Link>
          </li>
          {Array.from(Array(pagecount), i => i++).map((item, id) => (
            <li
              key={id + 1}
              className={`page-item ${id + 1 === currentpage ? "active" : ""}`}
            >
              <Link
                className="page-link bg-dark text-white"
                to={`/search/${q}/${id + 1}`}
              >
                {id + 1}
              </Link>
            </li>
          ))}

          <li
            className={`page-item ${
              currentpage === pagecount ? "disabled" : ""
            }`}
          >
            <Link
              className="page-link bg-dark text-white"
              to={`/search/${q}/${currentpage + 1}`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
