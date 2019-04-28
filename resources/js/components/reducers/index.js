import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import bookPageReducer from "./bookPageReducer";
import userReducer from "./userReducer";

export default combineReducers({
  books: booksReducer,
  bookPage: bookPageReducer,
  user: userReducer
});
