import { NAV } from "../actions/types";

const INITIAL_STATE = {
  navNo: 0,
};

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAV:
      return { ...state, navNo: action.payload };
    default:
      return state;
  }
};
