import axios from "axios";
import { GET_EVENTS, CREATE_EVENT, GET_ERRORS } from "./types";

// Register User
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