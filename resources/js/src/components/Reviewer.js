import React from "react";
import { Helmet } from "react-helmet";
import BookItem from "./bookItem";

export default function Reviewer(props) {
  const bookReviewer = props.match.params.reviewer;
  let books = props.books.filter(book => book.review_author === bookReviewer);
  return (
    <div className="slide-down" onLoad={window.scroll(0, 0)}>
      <Helmet>
        <title>Books By {bookReviewer} - Book Reviews</title>
      </Helmet>
      <div className="row">
        <h1 className="text-white underline col-12">
          <i>
            Books Reviewd By <strong>{bookReviewer}</strong>:
          </i>
        </h1>
        {books.map(book => (
          <BookItem book={book} key={book.id} viewType="list" />
        ))}
      </div>
    </div>
  );
}
