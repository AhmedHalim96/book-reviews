import * as actionTypes from "./types";
import axios from "axios";

export const getBook = id => async dispatch => {
  const res = await axios
    .get(`/books/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_BOOK,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
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
export const createBook = (newBook, history) => async dispatch => {
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

  await axios
    .post("/books", fd)
    .then(res => {
      dispatch({
        type: actionTypes.CREATE_BOOK
      });
      history.push("/book/" + res.data.id);
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
