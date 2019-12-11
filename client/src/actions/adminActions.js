import axios from "axios";
import {
  GET_USERS, DELETE_USER,
} from "./types"

export const getUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => 
      dispatch({
        type: GET_USERS,
        payload: res.data
      }))
    .catch(err => 
      console.log(err)
    );
};

export const deleteUser = userId => dispatch => {
  console.log("deleting")
  axios
    .delete(`api/users/${userId}`, { data: userId })
    .then(res =>
      dispatch({
        type: DELETE_USER,
      }))
    .catch(err => console.log(err));
};