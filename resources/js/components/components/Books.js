import React from "react";
// import axios from 'axios';
import BookItem from "./bookItem";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";

// import {Link} from 'react-router-dom'

function Books(props) {
  const { books } = props;

  return (
    <div className="row">
      {books.map(book => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
}

Books.protoTypes = {
  books: PropTypes.array.isRequired
};

export default Books;
