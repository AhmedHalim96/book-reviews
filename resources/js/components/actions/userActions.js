import * as actionTypes from "./types";
import axios from "axios";

export const getFavouriteList = id => async dispatch => {
  const res = await axios
    .post(`/favourites/view`, {
      user_id: id
    })
    .then(res => {
      let payload = [];
      if (res.data) {
        res.data.map(book => payload.push(book.book_id));
      }
      dispatch({
        type: actionTypes.GET_FAVOURITE_LIST,
        payload: payload
      });
      dispatch(appReady());
    })
    .catch(err => console.log(err));
};

export const addToFavourite = (book, user) => async dispatch => {
  const res = await axios
    .post(`/favourites/create`, {
      user_id: user,
      book_id: book
    })
    .then(res => {
      dispatch(getFavouriteList(user));

      dispatch({
        type: actionTypes.ADD_TO_FAVOURITES
      });
    })
    .catch(err => console.log(err));
};

export const removeFromFavourite = (book, user) => async dispatch => {
  const res = await axios
    .post(`/favourites/delete`, {
      user_id: user,
      book_id: book
    })
    .then(res => {
      dispatch({
        type: actionTypes.REMOVE_FROM_FAVOURITES
      });
      dispatch(getFavouriteList(user));
      console.log(res);
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
