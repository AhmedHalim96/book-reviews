import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import singleBookReducer from "./singleBookReducer";
import userReducer from "./userReducer";

export default combineReducers({
  books: booksReducer,
  bookPage: singleBookReducer,
  user: userReducer
});
