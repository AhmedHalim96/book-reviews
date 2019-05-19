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
          review_author,
          book_author,
          review_text,
          book_score,
          featured_image,
          user_id
        } = this.props.book;
        const currentBookId = this.props.book.id;
        const likedClass = this.props.liked ? "text-danger" : "text-secondary";

        return (
          <Fragment>
            <Link to="/">
              <i className="fa fa-arrow-circle-left" /> Return to Home
            </Link>

            <hr />

            <div className="card">
              <h1 className="card-header">
                <strong>{name}</strong>
                <span className="ml-3">
                  <small>By</small>
                  <i className="text-primary">{book_author} </i>
                </span>
                {this.props.isLoggedIn &&
                (this.props.user.role == "Admin" ||
                  (this.props.user.role == "Editor" &&
                    this.props.user.id == user_id)) ? (
                  <div className="dropdown d-inline">
                    <Link
                      to=""
                      className="fa fa-pencil text-primary"
                      style={{ fontSize: "2rem" }}
                      aria-hidden="true"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link
                        to={`/book/${currentBookId}/edit`}
                        className=" dropdown-item"
                      >
                        <i
                          className="fa fa-pencil  text-primary"
                          aria-hidden="true"
                        />{" "}
                        Edit Review
                      </Link>
                      <Link
                        to="/"
                        className=" dropdown-item"
                        onClick={this.deleteHandler}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        />{" "}
                        Delete Book
                      </Link>
                    </div>
                  </div>
                ) : null}
                <button
                  className="btn float-right"
                  onClick={this.likeHandler}
                  title="Add To Favourites"
                >
                  <i className={"fa fa-heart fa-2x " + likedClass} />
                </button>
              </h1>
              <div className="row">
                <div className="col-md-6 ">
                  <img
                    src={`/storage/featured_images/${featured_image}`}
                    alt={name}
                    className="card-img-top img-thumbnail"
                  />
                </div>
              </div>
              <div>
                <div className="card-body px-2 pb-2">
                  <i>
                    <strong className="text-danger">Reviewed by: </strong>
                  </i>
                  {review_author}
                  <br />
                  <span className="ml-3">
                    <i className="text-dark">Reviewer Rating: </i>
                    <span className="badge badge-danger">
                      {book_score % 1 == 0
                        ? book_score.slice(0, 1)
                        : book_score.slice(0, 3)}{" "}
                      / 5
                    </span>
                  </span>
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: review_text }}
                    className="lead"
                  />
                </div>
              </div>
            </div>
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
  isLoaded: PropTypes.bool.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getBook,
      addToFavourite,
      removeFromFavourite,
      clearBook,
      isLiked,
      deleteBook
    }
  )(BookPage)
);
