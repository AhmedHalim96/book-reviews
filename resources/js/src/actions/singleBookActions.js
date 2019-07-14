import * as actionTypes from "./types";
import axios from "axios";
import { getBooks } from "./booksActions";
import { Redirect } from "react-router-dom";

export const getBook = id => async dispatch => {
  const res = await axios
    .get(`/books/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_BOOK,
        payload: res.data.book
      });
    })
    .catch(err => {
      console.log(err);
      return <Redirect to="/" />;
    });
};
export const isLiked = (book, user) => async dispatch => {
  await axios
    .post(`/books/${book}`, {
      user_id: user
    })
    .then(res => {
      dispatch({
        type: actionTypes.IS_LIKED,
        payload: res.data.success
      });
    })
    .catch(err => console.log(err));
};
export const createBook = (newBook, userId, history) => async dispatch => {
  const {
    name,
    review_text,
    book_author,
    book_score,
    featured_image
  } = newBook;
  const fd = new FormData();
  fd.append("name", name);
  fd.append("review_text", review_text);
  fd.append("book_author", book_author);
  fd.append("book_score", book_score);
  fd.append("featured_image", featured_image);
  fd.append("user_id", userId);

  await axios
    .post("/books", fd)
    .then(res => {
      dispatch({
        type: actionTypes.CREATE_BOOK
      });
      dispatch(getBooks());
      setTimeout(() => {
        history.push("/book/" + res.data.id);
      }, 300);
    })
    .catch(err => console.log(err));
};
export const updateBook = (updatedBook, userId) => async dispatch => {
  const {
    id,
    name,
    review_text,
    book_author,
    book_score,
    featured_image
  } = updatedBook;

  const fd = new FormData();
  fd.append("name", name);
  fd.append("review_text", review_text);
  fd.append("book_author", book_author);
  fd.append("book_score", book_score);
  fd.append("featured_image", featured_image);
  fd.append("user_id", userId);
  fd.append("_method", "PATCH");
  axios
    .post(`/books/${id}`, fd)
    .then(res => {
      dispatch({
        type: actionTypes.UPDATE_BOOK
      });
      dispatch(getBooks());
      dispatch(getBook(id));
    })
    .catch(err => console.log(err));
};
export const deleteBook = (id, userId) => async dispatch => {
  await axios
    .post(`/books/${id}`, {
      _method: "DELETE",
      user_id: userId
    })
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_BOOK
      });
      dispatch(getBooks());
    })
    .catch(err => console.log(err));
};
export const clearBook = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_BOOK
  });
};
