import * as actionTypes from "./types";
import axios from "axios";
import { getBooks } from "./booksActions";
import { Redirect } from "react-router-dom";

export const getBook = id => async dispatch => {
  const res = await axios
    .get(`/books/${id}`)
    .then(res => {
      console.log(res.data);
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
      history.push("/book/" + res.data.id);
      dispatch(getBooks());
    })
    .catch(err => console.log(err));
};
export const updateBook = updatedBook => async dispatch => {
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
export const deleteBook = (id, history) => async dispatch => {
  await axios
    .delete(`/books/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_BOOK
      });
      history.push("/");
    })
    .catch(err => console.log(err));
};
export const clearBook = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_BOOK
  });
};
