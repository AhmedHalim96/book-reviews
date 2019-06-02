import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function bookItem(props) {
  const {
    id,
    name,
    book_author,
    review_text,
    book_score,
    featured_image
  } = props.book;
  const mini_review_text = review_text.slice(0, 40) + '...."';
  if (props.viewType == "list") {
    return (
      <div className="card col-md-10 mx-auto card-dark bg-dark text-white pt-3 mb-2">
        <div className="card-body">
          <h5>
            {name} <small>Written by</small> {book_author}{" "}
            <span className="float-right">{book_score.slice(0, 3)} / 5</span>
          </h5>
          <div
            dangerouslySetInnerHTML={{ __html: mini_review_text }}
            className="card-text d-inline"
          />
          <Link to={`/book/${id}`} className="float-right">
            Read Review
          </Link>
        </div>
      </div>
    );
  } else if (props.viewType == "grid") {
    return (
      <div className="card mb-4 card-dark bg-dark text-white mx-3 pl-3 py-2 col-md-5">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={`/storage/featured_images/${featured_image}`}
              alt={name}
              className="card-img"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {name} by {book_author}
              </h5>
              <div
                dangerouslySetInnerHTML={{ __html: mini_review_text }}
                className="card-text d-inline"
              />
              <Link to={`/book/${id}`} className="float-right">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
