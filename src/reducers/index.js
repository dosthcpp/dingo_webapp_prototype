import { combineReducers } from "redux";
import { fetchReducer } from "./dataReducer";
import { miscReducer } from "./miscReducer";
import { navReducer } from "./navReducer";

export default combineReducers({
  fetch: fetchReducer,
  nav: navReducer,
  misc: miscReducer,
});
