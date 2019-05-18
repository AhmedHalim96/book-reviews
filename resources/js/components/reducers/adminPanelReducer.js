import * as actionTypes from "../actions/types";
const initialState = { users: [], isLoaded: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return { ...state, users: action.payload, isLoaded: true };
    case actionTypes.ASSIGN_USER_ROLE:
      return { ...state };

    default:
      return state;
  }
}
