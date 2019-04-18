import {combineReducers } from 'redux';
import booksReducer from './booksReducer';
import bookPageReducer from './bookPageReducer';



export default combineReducers({
  books: booksReducer,
  bookPage: bookPageReducer,
})