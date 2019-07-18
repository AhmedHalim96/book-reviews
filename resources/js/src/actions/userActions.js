import * as actionTypes from "./types";
import $ from "jquery";
import axios from "axios";
import { simpleCrypto, expiredStorage } from "../utilities";

export const getUser = () => dispatch => {
  expiredStorage.clearExpired();
  let AppState = null;
  if (localStorage["appState"]) {
    try {
      AppState = simpleCrypto.decrypt(localStorage["appState"], true);
      if (AppState.isLoggedIn) {
        dispatch({
          type: actionTypes.GET_USER,
          payload: AppState.user
        });
      }
    } catch (error) {
      dispatch(logoutUser());
    }
  }

  dispatch(appReady());
};

export const loginUser = (email, password, rememberMe, history) => dispatch => {
  $("#login-form button")
    .attr("disabled", "disabled")
    .html(
      '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
    );
  var formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("rememberMe", rememberMe);

  axios
    .post("/api/user/login", formData)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        alert("Login Success!");

        let userData = {
          name: json.data.data.name,
          id: json.data.data.id,
          email: json.data.data.email,
          token: json.data.data.token,
          timestamp: new Date().toString(),
          role: json.data.data.role
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };

        // Encrypt appState for localStorage
        const encryptedAppState = simpleCrypto.encrypt(appState);

        // save app state with user date in local storage
        if (rememberMe) {
          expiredStorage.setItem("appState", encryptedAppState, 604800);
        } else {
          expiredStorage.setItem("appState", encryptedAppState, 3600);
        }

        dispatch({
          type: actionTypes.LOGIN_USER,
          payload: appState.user
        });
        dispatch(getFavouriteList(appState.user.id));
        history.push("/");
      } else alert("Login Failed!");

      $("#login-form button")
        .removeAttr("disabled")
        .html("Login");
    })
    .catch(error => {
      alert(`An Error Occured! ${error}`);
      $("#login-form button")
        .removeAttr("disabled")
        .html("Login");
    });
};

export const setUser = user => dispatch => {
  let appState = {
    isLoggedIn: true,
    user: user
  };

  // Encrypt appState for localStorage
  const encryptedAppState = simpleCrypto.encrypt(appState);

  // save app state with user date in local storage
  expiredStorage.setItem("appState", encryptedAppState, 3600);
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

export const appReady = () => dispatch => {
  dispatch({
    type: actionTypes.APP_READY
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
      dispatch(appReady());
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
