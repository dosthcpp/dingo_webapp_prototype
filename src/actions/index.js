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
  GET_CHILDLIST,
  ADD_NOTIFY_ERROR,
  GET_USERINFO,
} from "./types";
import axios from "axios";
import { authService, firebaseStorage, firestore } from "../firebase";

const baseUrl =
  "http://ec2-52-68-10-27.ap-northeast-1.compute.amazonaws.com:5000";
const testUrl = "http://korjarvis.asuscomm.com:5051/";

export const fetchUserInfo = (email) => async (dispatch) => {
  try {
    const nickname =
      (await firestore.collection("user").doc(email).get()).data()["닉네임"] ??
      "";
    let profileUrl = "";
    const userProfile = (
      await firestore.collection("user").doc(email).get()
    ).data()["userProfile"];
    try {
      if (typeof userProfile !== undefined) {
        profileUrl = await firebaseStorage
          .ref()
          .child(userProfile)
          .getDownloadURL();
      } else {
        profileUrl = await firebaseStorage
          .ref()
          .child("/placeholder/icon.png")
          .getDownloadURL();
      }
    } catch (e) {
      profileUrl =
        "https://firebasestorage.googleapis.com/v0/b/dingoprototype-e13f6.appspot.com/o/placeholder%2Ficon.png?alt=media&token=cba2864b-84db-4c83-b0d3-11ff844223eb";
    }
    const payload = {
      email,
      nickname,
      profileUrl,
    };
    dispatch({
      type: GET_USERINFO,
      payload,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchParentList = () => async (dispatch) => {
  try {
    // /process/listuser
    const parents = [];
    const snap = await firestore
      .collection("user")
      .where("userType", "==", "학부모")
      .get();
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
    const snap = await firestore
      .collection("user")
      .where("userType", "==", "학부모")
      .get();
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

export const fetchChildList = () => async (dispatch) => {
  try {
    const childList = [];
    const snap = await firestore
      .collection("user")
      .where("userType", "==", "학부모")
      .get();
    for (var i = 0; i < snap.docs.length; ++i) {
      childList.push({
        id: snap.docs[i].id,
        "원아 이름": snap.docs[i].data()["원아 이름"],
      });
    }
    dispatch({
      type: GET_CHILDLIST,
      payload: childList,
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
    const sliced = agreementBoardList.slice(0, 11);
    dispatch({
      type: GET_AGREEMENT_BOARD,
      payload: sliced,
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
    const noti =
      (
        await firestore
          .collection("user")
          .doc(authService()?.currentUser?.email ?? "")
          .get()
      ).data()?.notifications ?? [];
    if (typeof noti !== "undefined") {
      dispatch({
        type: GET_NOTIFY,
        payload: noti,
      });
    } else {
      dispatch({
        type: GET_NOTIFY,
        payload: [],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const addNotifications = (noti) => async (dispatch) => {
  try {
    const _noti = {
      content: noti,
      time: Date.now(),
    };
    const _d = (
      await firestore.collection("user").where("userType", "==", "선생님").get()
    ).docs;
    for (let i = 0; i < _d.length; ++i) {
      const doc = _d[i];
      const oldNoti =
        (await firestore.collection("user").doc(doc.id).get()).data()
          ?.notifications ?? [];
      const willUpdate = [...oldNoti, _noti];
      await firestore.collection("user").doc(doc.id).update({
        notifications: willUpdate,
      });
    }
    return dispatch({
      type: ADD_NOTIFY,
      payload: _noti,
    });
  } catch (e) {
    return dispatch({
      type: ADD_NOTIFY_ERROR,
      payload: e,
    });
  }
};

export const refreshNoti = (noti) => async (dispatch) => {
  try {
    (
      await firestore.collection("user").doc(authService().currentUser.email)
    ).update({
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
