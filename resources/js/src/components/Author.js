import React from "react";
import { Helmet } from "react-helmet";
import BookItem from "./bookItem";

export default function Author(props) {
  const bookAuthor = props.match.params.author;
  let books = props.books.filter(book => book.book_author === bookAuthor);
  console.log(books);
  return (
    <div className="slide-down">
      <Helmet>
        <title>Books By {bookAuthor} - Book Reviews</title>
      </Helmet>
      <div className="row">
        <h1 className="text-white underline col-12">
          <i>
            Books By <strong>{bookAuthor}</strong>:
          </i>
        </h1>
        {books.map(book => (
          <BookItem book={book} key={book.id} viewType="list" />
        ))}
      </div>
    </div>
  );
}
