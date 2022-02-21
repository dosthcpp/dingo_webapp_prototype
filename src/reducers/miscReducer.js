import { USE_LAYOUT } from "../actions/types";

const INITIAL_STATE = {
  useLayout: 0,
};

export const miscReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USE_LAYOUT:
      return { ...state, useLayout: (state.useLayout + 1) % 3 };
    default:
      return state;
  }
};
