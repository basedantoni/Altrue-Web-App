import { GET_EVENTS, CREATE_EVENT } from "../actions/types";

const initialState = {
    events: [],
    event: {}
}

export default function(state = initialState, actions) {
    switch(actions.type) {
      case GET_EVENTS:
        return {
          ...state,
          items: actions.payload
        };
      case CREATE_EVENT:
        return {
          ...state,
          item: actions.payload
        };
      default:
        return state;
    }
  }