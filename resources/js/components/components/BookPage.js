import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import {
  getBook,
  clearBook,
  isLiked,
  deleteBook
} from "../actions/singleBookActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBooks } from "../actions/booksActions";
import { addToFavourite, removeFromFavourite } from "../actions/userActions";

import Spinner from "./layout/Spinner";

class BookPage extends Component {
  componentDidMount() {
    this.intialize(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.intialize(nextProps);
    }
  }

  intialize = props => {
    props.clearBook();
    const bookId = parseInt(props.match.params.id);
    if (props.isLoggedIn) {
      const userId = props.user.id;
      props.isLiked(bookId, userId);
    }
    props.getBook(bookId);
    props.getBooks();
  };
  likeHandler = async e => {
    if (this.props.isLoggedIn) {
      const bookId = parseInt(this.props.match.params.id);
      const userId = this.props.user.id;
      e.preventDefault();
      let method = this.props.liked
        ? this.props.removeFromFavourite
        : this.props.addToFavourite;

      await method(bookId, userId);
      this.props.isLiked(bookId, userId);
    } else {
      alert("Log in Please");
    }
  };
  deleteHandler = e => {
    e.preventDefault();
    this.props.deleteBook(this.props.match.params.id, this.props.history);
  };

  render() {
    if (this.props.isLoaded) {
      if (this.props.book) {
        const {
          name,
          book_author,
          review_text,
          book_score,
          featured_image
        } = this.props.book;
        const currentBookId = this.props.book.id;
        const likedClass = this.props.liked ? "text-danger" : "text-secondary";

        return (
          <Fragment>
            <Link to="/">
              <i className="fa fa-arrow-circle-left" /> Return to Home
            </Link>

            <hr />

            <div className="card card-body">
              <h1>
                {name}
                <span className="badge badge-danger ml-2">
                  {book_score.slice(0, 3)} / 5
                </span>
                <button
                  className="btn float-right mx-3 btn-outline-info btn-lg"
                  onClick={this.likeHandler}
                  title="Add To Favourites"
                >
                  <i
                    className={"fa fa-heart " + likedClass}
                    style={{ fontSize: "3rem" }}
                  />
                </button>
              </h1>

              <h5>
                <small>By: </small>
                <i>{book_author}</i>
              </h5>
              <div className="row mb-3">
                <div className="col-md-6 ">
                  <img
                    src={`/storage/featured_images/${featured_image}`}
                    alt={name}
                    className="card-img-top img-thumbnail"
                  />
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: review_text }}
                className="lead"
              />
            </div>

            {this.props.isLoggedIn ? (
              <Fragment>
                <Link
                  to={`/book/${currentBookId}/edit`}
                  className="btn btn-success btn-lg"
                >
                  Edit Review
                </Link>
                <button
                  type="submit"
                  className="btn btn-danger btn-lg float-right"
                  onClick={this.deleteHandler}
                >
                  Delete Book
                </button>
              </Fragment>
            ) : null}

            <hr />

            <div className="list-group">
              <li className="list-group-item list-group-item-action list-group-item-secondary">
                Other Book Reviews
              </li>
              {this.props.books.map((item, id) => {
                if (item.id != currentBookId) {
                  return (
                    <li
                      key={id}
                      className="list-group-item list-group-item-secondary"
                    >
                      <Link to={`/book/${item.id}`}>{item.name}</Link>
                    </li>
                  );
                }
              })}
            </div>
          </Fragment>
        );
      }
      return <Redirect to="/" />;
    }
    return <Spinner />;
  }
}
const mapStateToProps = state => ({
  books: state.books.books,
  book: state.bookPage.book,
  isLoaded: state.bookPage.isLoaded,
  liked: state.bookPage.liked
});
BookPage.proptypes = {
  books: PropTypes.array.isRequired,
  book: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getBook,
      getBooks,
      addToFavourite,
      removeFromFavourite,
      clearBook,
      isLiked,
      deleteBook
    }
  )(BookPage)
);
