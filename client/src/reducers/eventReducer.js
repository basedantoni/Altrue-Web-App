import { GET_EVENTS, CREATE_EVENT, GET_CALENDAR_EVENT } from "../actions/types";

const initialState = {
    event: [],
    events: {},
    calendarEvents: []
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
      case GET_CALENDAR_EVENT:
        return {
          ...state,
          calendarEvents: actions.payload
        }
      default:
        return state;
    }
  }