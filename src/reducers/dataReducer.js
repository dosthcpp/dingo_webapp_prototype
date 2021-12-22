import {
  GET_PARENT_LIST,
  GET_AGREEMENT,
  GET_CHAT_LIST,
  GET_NOTIFY,
  ADD_NOTIFY,
  REFRESH_NOTIFY,
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  agreement: [],
  chatList: [],
  notifications: [],
};

export const fetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PARENT_LIST:
      return { ...state, data: action.payload };
    case GET_AGREEMENT:
      return { ...state, agreement: action.payload };
    case GET_CHAT_LIST:
      return { ...state, chatList: action.payload };
    case GET_NOTIFY:
    case ADD_NOTIFY:
    case REFRESH_NOTIFY:
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};
