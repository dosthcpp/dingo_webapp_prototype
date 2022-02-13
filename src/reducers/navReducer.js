import { NAV } from "../actions/types";

const INITIAL_STATE = {
  navNo: 0,
};

// NAV라는 상태변화 함수를 실행함으로써 화면이 바뀜

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAV:
      return { ...state, navNo: action.payload };
    default:
      return state;
  }
};
