import * as actionTypes from "../actions/types";

const initialState = {
  book: {},
  isLoaded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BOOK:
      return {
        ...state,
        book: action.payload,
        isLoaded: true
      };
    case actionTypes.CLEAR_BOOK:
      return {
        ...state,
        book: {},
        isLoaded: false
      };
    default:
      return state;
  }
}
