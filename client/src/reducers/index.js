import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import postReducer from "./postReducer.js";
import accountReducer from "./accountReducers.js";
import adminReducer from "./adminReducer.js";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer,
  plaid: accountReducer,
  admin: adminReducer
})