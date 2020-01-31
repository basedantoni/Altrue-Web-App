import { GET_EVENTS, CREATE_EVENT } from "../actions/types";

const initialState = {
    event: [],
    events: {}
}

export default function(state = initialState, actions) {
    switch(actions.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: actions.payload
        };
      case CREATE_EVENT:
        return {
          ...state,
          event: actions.payload
        };
      default:
        return state;
    }
  }