import * as actionTypes from "../actions/types";
const initialState = {
  favouriteBooks: [],
  isReady: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_FAVOURITE_LIST:
      return { ...state, favouriteBooks: action.payload, isReady: true };
    case actionTypes.APP_READY:
      return {
        ...state,
        isReady: true
      };
    case actionTypes.RESET_USER:
      return {
        ...state,
        favouriteBooks: []
      };

    case actionTypes.ADD_TO_FAVOURITES:
      return {
        ...state
      };
    case actionTypes.REMOVE_FROM_FAVOURITES:
      return {
        ...state
      };
    default:
      return state;
  }
}
