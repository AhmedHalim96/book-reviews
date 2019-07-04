import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Sidebar(props) {
  const { books } = props;
  return (
    <div className="sticky-top card card-body vh-100 card-dark text-white bg-dark ">
      <div className="list-group">
        <li className="list-group-item list-group-item-action list-group-item-secondary">
          Recent Book Reviews
        </li>
        {books.map((book, id) => {
          if (id <= 2) {
            return (
              <li
                key={book.id}
                className="list-group-item list-group-item-secondary"
              >
                <Link to={`/book/${book.id}`}>{book.name}</Link>
              </li>
            );
          }
        })}
      </div>
    </div>
  );
}

Sidebar.protoTypes = {
  books: PropTypes.array.isRequired
};

export default Sidebar;
