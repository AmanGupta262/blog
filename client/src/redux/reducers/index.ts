import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import categories from "./category";

export default combineReducers({
  auth,
  alert,
  categories,
});
