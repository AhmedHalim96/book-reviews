import * as actionTypes from "./types";
import axios from "axios";

export const getUsers = token => async dispatch => {
  await axios
    .get("/api/users/list?token=" + token)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: actionTypes.GET_USERS,
        payload: res.data.users
      });
    })
    .catch(err => console.log(err));
};
export const assignUserRole = (token, id, role) => async dispatch => {
  await axios
    .post("/api/user/role?token=" + token, {
      user_id: id,
      role: role
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: actionTypes.ASSIGN_USER_ROLE
      });
      dispatch(getUsers(token));
    })
    .catch(err => console.log(err));
};
