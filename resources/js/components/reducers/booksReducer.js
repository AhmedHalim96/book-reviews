import * as actionTypes from "../actions/types";
const initialState = { books: [], isLoaded: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BOOKS:
      return { ...state, books: action.payload, isLoaded: true };
    default:
      return state;
  }
}
