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
export const clearBook = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_BOOK
  });
};
