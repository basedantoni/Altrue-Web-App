import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_CURRENT_MANAGER,
  SET_CURRENT_ADMIN,
  GET_USERS,
  GET_USER_STATS,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  stats: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING: 
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_MANAGER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        manager: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        usersLoading: false
      };
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    case GET_USER_STATS:
      return {
        ...state,
        stats: action.payload
      }
    default:
      return state;
  }
}