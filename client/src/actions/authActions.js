import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  //USER_LOADING
} from "./types"

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res => history.push("/login")) // redirect to login on succesful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.res // should be `err.response.data` but it will have to be null for now
      })
    );
};

// Login get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
    // Save to localStorage
    //set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: null // should be `err.response.data` but it will have to be null for now
      })
    );
    console.log("SUCCESS");
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAUthenticated to false
  dispatch(setCurrentUser({}));
};