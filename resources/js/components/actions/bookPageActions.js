import * as actionTypes from './types';
import axios from 'axios';

export const getBook = id =>async dispatch => {
  const res = await axios.get(`/books/${id}`);
  // console.log(res)
  dispatch(
    {
      type: actionTypes.GET_BOOK,
      payload: res.data
    }
  ); 
}