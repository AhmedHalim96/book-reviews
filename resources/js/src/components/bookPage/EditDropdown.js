import React from "react";
import { Link } from "react-router-dom";

export default function EditDropdown({ currentBookId, showModalHandler }) {
  return (
    <div className="dropdown d-inline">
      <Link
        to=""
        className="fa fa-pen text-primary"
        style={{ fontSize: "2rem" }}
        aria-hidden="true"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      />
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link to={`/book/${currentBookId}/edit`} className=" dropdown-item">
          <i className="fa fa-pen  text-primary" aria-hidden="true" /> Edit
          Review
        </Link>
        <Link to="/" className=" dropdown-item" onClick={showModalHandler}>
          <i className="fa fa-trash text-danger" aria-hidden="true" /> Delete
          Book
        </Link>
      </div>
    </div>
  );
}
