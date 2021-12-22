import { combineReducers } from "redux";
import { fetchReducer } from "./dataReducer";
import { navReducer } from "./navReducer";

export default combineReducers({
  fetch: fetchReducer,
  nav: navReducer,
});
