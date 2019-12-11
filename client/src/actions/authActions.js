import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_CURRENT_MANAGER,
  SET_CURRENT_ADMIN,
  //USER_LOADING
} from "./types"

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // redirect to login on succesful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // should be `err.response.data` but it will have to be null for now
      })
    );
};

// Login get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
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
      console.log(res.data);
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

// Register Manager
export const registerManager = (userData, history) => dispatch => {
  axios
    .post("/api/manager/register", userData)
    .then(res => history.push("/loginManager")) // redirect to login on succesful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // should be `err.response.data` but it will have to be null for now
      })
    );
};

// Login get manager token
export const loginManager = userData => dispatch => {
  axios
    .post("/api/manager/login", userData)
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
      dispatch(setCurrentManager(decoded));
      console.log(res.data);
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
export const setCurrentManager = decoded => {
  return {
    type: SET_CURRENT_MANAGER,
    payload: decoded
  };
};

// Register Admin
export const registerAdmin = (userData, history) => dispatch => {
  axios
    .post("/api/admin/register", userData)
    .then(res => history.push("/loginAdmin")) // redirect to login on succesful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // should be `err.response.data` but it will have to be null for now
      })
    );
};

// Login get admin token
export const loginAdmin = userData => dispatch => {
  axios
    .post("/api/admin/login", userData)
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
      dispatch(setCurrentAdmin(decoded));
      console.log(res.data);
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
export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};

export const getUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => {
      console.log(res.body);
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: null // should be `err.response.data` but it will have to be null for now
      })
    );
};