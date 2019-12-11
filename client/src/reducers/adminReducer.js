import {
    GET_USERS,
    DELETE_USER
} from "../actions/types";

const initialState = {
  users: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}