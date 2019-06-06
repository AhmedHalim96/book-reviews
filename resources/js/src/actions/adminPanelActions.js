import * as actionTypes from "./types";
import axios from "axios";

export const getUsers = (token, userId) => async dispatch => {
  await axios
    .post("/api/users/list?token=" + token, {
      _method: "GET",
      user_id: userId
    })
    .then(res => {
      dispatch({
        type: actionTypes.GET_USERS,
        payload: res.data.users
      });
    })
    .catch(err => console.log(err));
};
export const assignUserRole = (
  token,
  adminId,
  targetedUserId,
  role
) => async dispatch => {
  await axios
    .post("/api/user/role?token=" + token, {
      token: token,
      user_id: adminId,
      targeted_user: targetedUserId,
      role: role
    })
    .then(res => {
      console.log(res.data);
      // dispatch({
      //   type: actionTypes.ASSIGN_USER_ROLE
      // });
      // dispatch(getUsers(token));
    })
    .catch(err => console.log(err));
};
