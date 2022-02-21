import {
  GET_PARENT_LIST,
  GET_AGREEMENT,
  GET_CHAT_LIST,
  GET_NOTIFY,
  ADD_NOTIFY,
  ADD_NOTIFY_ERROR,
  REFRESH_NOTIFY,
  GET_AGREEMENT_BOARD,
  DID_FETCH_BOARD,
  GET_GOV_NOTI,
  GET_CORONA_NOTI,
  GET_PM,
<<<<<<< HEAD
  GET_CHILDLIST,
  GET_USERINFO,
  CLEAR_USERINFO,
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
} from "../actions/types";

const INITIAL_STATE = {
  didFetchBoard: false,
<<<<<<< HEAD
  userInfo: {},
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
  data: [],
  childList: [],
  agreement: [],
  agreementBoard: [],
  chatList: [],
  notifications: [],
  govNoti: [],
  coronaNoti: [],
  pm: [],
};

export const fetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERINFO:
      return { ...state, userInfo: action.payload };
    case CLEAR_USERINFO:
      return { ...state, userInfo: {} };
    case GET_PARENT_LIST:
      return { ...state, data: action.payload };
    case GET_AGREEMENT:
      return { ...state, agreement: action.payload };
    case GET_CHAT_LIST:
      return { ...state, chatList: action.payload };
    case GET_AGREEMENT_BOARD:
      return { ...state, agreementBoard: action.payload };
<<<<<<< HEAD
=======
    case GET_NOTIFY:
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
    case ADD_NOTIFY:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ADD_NOTIFY_ERROR:
      return state;
    case GET_NOTIFY:
    case REFRESH_NOTIFY:
      return { ...state, notifications: action.payload };
    case DID_FETCH_BOARD:
      return { ...state, didFetchBoard: action.payload };
    case GET_GOV_NOTI:
      return { ...state, govNoti: action.payload };
    case GET_CORONA_NOTI:
      return { ...state, coronaNoti: action.payload };
    case GET_PM:
      return { ...state, pm: action.payload };
<<<<<<< HEAD
    case GET_CHILDLIST:
      return { ...state, childList: action.payload };
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
    default:
      return state;
  }
};
