import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { getBooks } from "../../actions/booksActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./Spinner";

class Sidebar extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    const { books, isLoaded } = this.props;
    if (isLoaded) {
      return (
        <div className="sticky-top card card-body vh-100 card-dark text-white bg-dark">
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
    return <Spinner />;
  }
}
const mapStateToProps = state => ({
  books: state.books.books,
  isLoaded: state.books.isLoaded
});

Sidebar.protoTypes = {
  books: PropTypes.array.isRequired,
  getBooks: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool
};

export default connect(
  mapStateToProps,
  { getBooks }
)(Sidebar);
