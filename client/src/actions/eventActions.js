import axios from "axios";
import { GET_EVENTS, GET_ERRORS, GET_CALENDAR_EVENT } from "./types";

// Create Event
export const createEvent = (eventData) => dispatch => {
    axios
      .post("/api/event/createEvent", eventData)
      .then(res => console.log(res))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
};

// Get All Events
export const getEvents = () => dispatch => {
  axios
    .get("/api/event/")
    .then(res => 
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      }))
    .catch(err => console.log(err))
}

// Get Events by Date
export const getCalendarEvents = (date) => dispatch => {
  axios
    .get(`api/event/calendarEvents/${date}`)
    .then(res => {
      dispatch({
        type: GET_CALENDAR_EVENT,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}