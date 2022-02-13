import {
  GET_PARENT_LIST,
  GET_AGREEMENT,
  GET_CHAT_LIST,
  GET_NOTIFY,
  ADD_NOTIFY,
  REFRESH_NOTIFY,
  GET_AGREEMENT_BOARD,
  GET_GOV_NOTI,
  GET_CORONA_NOTI,
  GET_PM,
} from "./types";
import axios from "axios";
import { firestore } from "../firebase";

const baseUrl =
  "http://ec2-52-68-10-27.ap-northeast-1.compute.amazonaws.com:5000";
const testUrl = "http://korjarvis.asuscomm.com:5051/";

export const fetchParentList = () => async (dispatch) => {
  try {
    // /process/listuser
    const parents = [];
    const snap = await firestore.collection("user").get();
    for (var i = 0; i < snap.docs.length; ++i) {
      parents.push(snap.docs[i].data()["부모님 성함"]);
    }
    dispatch({
      type: GET_PARENT_LIST,
      payload: parents,
    });
    // 요청 성공
  } catch (e) {
    console.log(e);
  }
};

export const fetchAgreementList = () => async (dispatch) => {
  try {
    // /process/listAgreement
    const agrList = {};
    const snap = await firestore.collection("user").get();
    for (var i = 0; i < snap.docs.length; ++i) {
      agrList[snap.docs[i].data()["부모님 성함"]] =
        snap.docs[i].data()["동의서"];
    }
    dispatch({
      type: GET_AGREEMENT,
      payload: agrList,
    });
    // 요청 성공
  } catch (e) {
    console.log(e);
  }
};

export const fetchChatList = () => async (dispatch) => {
  try {
    // /process/listAgreement
    const chatList = [];
    const snap = await firestore
      .collection("messageList")
      .orderBy("time")
      .get();
    for (var i = 0; i < snap.docs.length; ++i) {
      chatList.push(snap.docs[i].data());
    }
    dispatch({
      type: GET_CHAT_LIST,
      payload: chatList,
    });
    // 요청 성공
  } catch (e) {
    console.log(e);
  }
};

export const fetchAgreementBoard = () => async (dispatch) => {
  try {
    const agreementBoardList = [];
    const snap = await firestore
      .collection("agreementBoard")
      .orderBy("date")
      .get();
    for (var i = snap.docs.length - 1; i >= 0; --i) {
      agreementBoardList.push(snap.docs[i].data());
    }
    dispatch({
      type: GET_AGREEMENT_BOARD,
      payload: agreementBoardList,
    });
    // 요청 성공
  } catch (e) {
    console.log(e);
  }
};

export const getGovNoti = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/govpost`);
    dispatch({
      type: GET_GOV_NOTI,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getPm = () => async (dispatch) => {
  try {
    const res = await axios.get(`${testUrl}/api`);
    dispatch({
      type: GET_PM,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCoronaNoti = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/coronapost`);
    dispatch({
      type: GET_CORONA_NOTI,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getNotifications = () => async (dispatch) => {
  try {
    const oldNoti = Array.from(
      (
        await firestore
          .collection("teachers")
          .where("선생님 성함", "==", "김시우")
          .limit(1)
          .get()
      ).docs[0].data()["notifications"]
    );
    dispatch({
      type: GET_NOTIFY,
      payload: oldNoti,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addNotifications = (noti) => async (dispatch, getState) => {
  try {
    console.log(getState().fetch.notifications.length);
    const _noti = [
      ...getState().fetch.notifications,
      {
        content: noti,
        time: Date.now(),
      },
    ];
    console.log(_noti);
    firestore
      .collection("teachers")
      .doc(
        (
          await firestore
            .collection("teachers")
            .where("선생님 성함", "==", "김시우")
            .limit(1)
            .get()
        ).docs[0].id
      )
      .update({
        notifications: _noti,
      });
    dispatch({
      type: ADD_NOTIFY,
      payload: _noti,
    });
  } catch (e) {
    console.log(e);
  }
};

export const refreshNoti = (noti) => async (dispatch) => {
  try {
    console.log(noti);
    firestore
      .collection("teachers")
      .doc(
        (
          await firestore
            .collection("teachers")
            .where("선생님 성함", "==", "김시우")
            .limit(1)
            .get()
        ).docs[0].id
      )
      .update({
        notifications: noti,
      });
    dispatch({
      type: REFRESH_NOTIFY,
      payload: noti,
    });
  } catch (e) {
    console.log(e);
  }
};
