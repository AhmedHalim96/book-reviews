import * as actionTypes from "./types";
import Axios from "axios";

export const getBooks = () => async dispatch => {
  const res = await Axios.get("/books");

  dispatch({
    type: actionTypes.GET_BOOKS,
    payload: res.data
  });
};
