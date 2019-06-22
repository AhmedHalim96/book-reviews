import React, { Component } from "react";
import BookItem from "./bookItem";
import { filterText } from "../customFunctions";

export default class Search extends Component {
  render() {
    let { books } = this.props;
    let q = this.props.match.params.q;
    books = books.filter(book => {
      let filteredQuery = filterText(q);
      return (
        filterText(book.name).indexOf() !== -1 ||
        filterText(book.book_author).indexOf(filteredQuery) !== -1 ||
        filterText(book.review_author).indexOf(filteredQuery) !== -1 ||
        filterText(book.review_text).indexOf(filteredQuery) !== -1
      );
    });
    console.log(books);
    return (
      <div className="row">
        <h1 className="text-white underline col-12">
          Search Results for "{q}"
        </h1>
        {books.length !== 0 ? (
          books.map(book => {
            return <BookItem book={book} key={book.id} viewType="list" />;
          })
        ) : (
          <div className="card card-body col-md-8 mx-auto py-5">
            <p className="lead card-text mx-auto">Sorry, No Search Results</p>
          </div>
        )}
      </div>
    );
  }
}
