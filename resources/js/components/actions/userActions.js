import * as actionTypes from "./types";
import { isLiked } from "./bookPageActions";
import axios from "axios";

export const getFavouriteList = id => async dispatch => {
  const res = await axios
    .post(`/books/favourites`, {
      user_id: id
    })
    .then(res => {
      dispatch({
        type: actionTypes.GET_FAVOURITE_LIST,
        payload: res.data
      });
      dispatch(appReady());
    })
    .catch(err => console.log(err));
};

export const addToFavourite = (book, user) => async dispatch => {
  const res = await axios
    .post(`/books/${book}/favourites`, {
      user_id: user,
      book_id: book
    })
    .then(res => {
      // dispatch(isLiked(book, user));
      dispatch(getFavouriteList(user));

      dispatch({
        type: actionTypes.ADD_TO_FAVOURITES
      });
    })
    .catch(err => console.log(err));
};

export const removeFromFavourite = (book, user) => async dispatch => {
  const res = await axios
    .post(`/books/${book}/favourites`, {
      user_id: user,
      book_id: book,
      _method: "DELETE"
    })
    .then(res => {
      dispatch({
        type: actionTypes.REMOVE_FROM_FAVOURITES
      });
      dispatch(getFavouriteList(user));
    })
    .catch(err => console.log(err));
};

export const resetUser = () => dispatch => {
  dispatch({
    type: actionTypes.RESET_USER
  });
};
export const appReady = () => dispatch => {
  dispatch({
    type: actionTypes.APP_READY
  });
};
