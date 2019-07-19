import * as actionTypes from "../actions/types";
const initialState = {
  user: {},
  isLoggedIn: false,
  favouriteBooks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_FAVOURITE_LIST:
      return { ...state, favouriteBooks: action.payload, isReady: true };

    case actionTypes.GET_USER_INFO_FROM_LOCAL_STORAGE:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };

    case actionTypes.RESET_USER:
      return {
        ...state,
        favouriteBooks: [],
        user: {},
        isLoggedIn: false
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
