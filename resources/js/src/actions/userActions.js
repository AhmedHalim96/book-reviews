import * as actionTypes from "./types";
import axios from "axios";
import { simpleCrypto, expiredStorage } from "../utilities";

export const getUserInfoFromLocalStorage = () => dispatch => {
  expiredStorage.clearExpired();
  let AppState = null;
  if (localStorage["appState"]) {
    try {
      AppState = simpleCrypto.decrypt(localStorage["appState"], true);
      if (AppState.isLoggedIn) {
        dispatch({
          type: actionTypes.GET_USER_INFO_FROM_LOCAL_STORAGE,
          payload: AppState.user
        });
      }
    } catch (error) {
      dispatch(logoutUser());
    }
  }
};

export const setUser = (user, rememberMe = false) => dispatch => {
  let appState = {
    isLoggedIn: true,
    user: user
  };

  // Encrypt appState for localStorage
  const encryptedAppState = simpleCrypto.encrypt(appState);

  // save app state with user date in local storage
  expiredStorage.setItem(
    "appState",
    encryptedAppState,
    rememberMe ? 604800 : 7200
  );
  dispatch({
    type: actionTypes.SET_USER,
    payload: user
  });
};

export const logoutUser = () => dispatch => {
  let appState = {
    isLoggedIn: false,
    user: {}
  };

  // Encrypt appState for localStorage
  const encryptedAppState = simpleCrypto.encrypt(appState);

  // save app state with user date in local storage
  expiredStorage.setItem("appState", encryptedAppState);

  dispatch(resetUser());
};
export const resetUser = () => dispatch => {
  dispatch({
    type: actionTypes.RESET_USER
  });
};

// Get Favourites
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
    })
    .catch(err => console.log(err));
};

// Add To Favourites
export const addToFavourite = (book, user) => async dispatch => {
  const res = await axios
    .post(`/books/favourites/add`, {
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

// Remove from Favourites
export const removeFromFavourite = (book, user) => async dispatch => {
  const res = await axios
    .post(`/books/favourites/remove`, {
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
