import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchChatList, fetchUserInfo } from "../actions";
import { connect } from "react-redux";
import { authService, firestore } from "../firebase";
import { useDispatch } from "react-redux";
import {
  SizedBox,
  Column,
  ColumnCentered,
  RowCentered,
  SizedBoxWithElevation,
} from "../layout";
import { parseDateForFirebase } from "../utils";
import icon from "../icons/icon.png";
import search from "../icons/search.png";
import alert from "../icons/alert.png";
import styled from "styled-components";

const CustomDivider = styled.hr`
  width: 40%;
  margin-top: 2px;
  margin-bottom: 2px;
  border-top: 0.3px solid #bbb;
`;

const ipcRenderer = window.require("electron").ipcRenderer;

const Chat = ({ fetchedChatList, fetchChatList, fetchUserInfo, userInfo }) => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    ipcRenderer.send("variable-request");
    ipcRenderer.on("variable-reply", (evt, args) => {
      fetchUserInfo(args);
      setEmail(args);
    });
  }, []);

  useEffect(() => {
    fetchChatList();
  }, [email, fetchChatList, fetchUserInfo]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("messageList")
      .onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          if (change.doc.data() !== null) {
            fetchChatList();
          }
        });
      });
    return unsubscribe;
  }, [dispatch, fetchChatList]);

  const parseDate = (date) => {
    const _date = new Date(date);
    return `${
      _date.getHours() > 10 ? _date.getHours() : `0${_date.getHours()}`
    }:${
      _date.getMinutes() > 10 ? _date.getMinutes() : `0${_date.getMinutes()}`
    }`;
  };

  const chatBubble = (chat) => {
    const isMe = chat["sender"] === userInfo.email;
    const isNotMe = chat["sender"] !== userInfo.email;

    return (
      <li
        style={{
          marginTop: "10px",
        }}
      >
        <RowCentered
          style={{
            justifyContent: isMe ? "flex-end" : "flex-start",
          }}
        >
          {isNotMe ? <img src={icon} alt="아이콘" /> : null}
          {isMe ? (
            <div
              style={{
                alignSelf: "flex-end",
              }}
            >{`${parseDate(chat["time"])}`}</div>
          ) : null}
          <SizedBox width="10px" />
          <Column>
            <div
              className="sender"
              style={{
                textAlign: isNotMe ? "start" : "end",
              }}
            >
              {isNotMe
                ? chat["userInfo"] === "선생님"
                  ? `[${chat["className"]}] ${chat["nickname"]} 선생님`
                  : `[${chat["className"]}] ${chat["childName"]} 학부모님`
                : `${userInfo.nickname} 선생님`}
            </div>
            <div
              className="message"
              style={{
<<<<<<< HEAD
                borderRadius: isNotMe
                  ? "20px 20px 20px 0px"
                  : "20px 20px 0px 20px",
                backgroundColor: isNotMe ? "#474f54" : "#318cea",
=======
                borderRadius:
                  chat["sender"] !== currentUser
                    ? "20px 20px 20px 0px"
                    : "20px 20px 0px 20px",
                backgroundColor:
                  chat["sender"] !== currentUser ? "#474f54" : "#318cea",
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
              }}
            >
              {chat["text"]}
            </div>
          </Column>
          <SizedBox width="10px" />
          {isNotMe ? (
            <div
              style={{
                alignSelf: "flex-end",
              }}
            >{`${parseDate(chat["time"])}`}</div>
          ) : null}
          {isMe ? <img src={icon} alt="아이콘" /> : null}
        </RowCentered>
      </li>
    );
  };

  const messagesStream = () => {
    const messageList = [];
    const chatList = Array.from(fetchedChatList);
    chatList.sort((a, b) => a["time"] > b["time"]);
<<<<<<< HEAD
=======
    console.log(chatList); // 비동기 함수가 아니기 떄문에 chatlist를 Fetch하는 동안 먼저 console.log함수가 실행됨
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
    for (var i = 0; i < chatList.length; ++i) {
      if (i === 0) {
        messageList.push(customDivider(new Date(chatList[i]["time"])));
      }
      console.log(chatList[i]);
      messageList.push(chatBubble(chatList[i]));
      if (
        i !== chatList.length - 1 &&
        chatList[i]["time"].toString().split(" ")[0] !==
          chatList[i + 1]["time"].toString().split(" ")[0]
      ) {
        messageList.push(customDivider(new Date(chatList[i + 1]["time"])));
      }
    }
    return messageList;
  };

  const customDivider = (date) => {
    const _date = new Date(date);
    return (
      <div
        style={{
          paddingBottom: "15px",
          paddingTop: "10px",
        }}
      >
        <RowCentered>
          <CustomDivider />
          <div
            style={{
              width: "15%",
              paddingLeft: "3%",
              paddingRight: "3%",
              textAlign: "center",
              fontSize: "10px",
            }}
          >{`${_date.getFullYear()}년 ${
            _date.getMonth() + 1 > 10
              ? _date.getMonth() + 1
              : `0${_date.getMonth() + 1}`
          }월 ${
            _date.getDate() > 10 ? _date.getDate() : `0${_date.getDate()}`
          }일`}</div>
          <CustomDivider />
        </RowCentered>
      </div>
    );
  };

  const onEnterPress = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      const userInfo = (
        await firestore.collection("user").doc(email).get()
      ).data();
      try {
        const _date = new Date();
        await firestore.collection("messageList").add({
          className: "희망반",
          sender: email,
          nickname: userInfo["닉네임"],
          text: e.target.value,
          time: parseDateForFirebase(_date),
          userType: userInfo.userType,
        });
        e.target.value = "";
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="chat_wrap">
      <Column>
        <SizedBoxWithElevation height="80px">
          <SizedBox height="10px" />
          <RowCentered
            style={{
              justifyContent: "space-between",
            }}
          >
            <RowCentered>
              <SizedBox width="10px" />
              <ColumnCentered>
                <div className="chat__class" ref={headerRef}>
                  희망유치원 단체 채팅방
                </div>
                <div className="chat__sender" ref={headerRef}>
                  오늘도 좋은 하루!
                </div>
              </ColumnCentered>
            </RowCentered>
            <RowCentered>
              <img
                src={search}
                alt="아이콘"
                style={{
                  width: "1.5rem",
                }}
              />
              <SizedBox width="10px" />
              <img
                src={alert}
                alt="아이콘"
                style={{
                  width: "1.5rem",
                }}
              />
            </RowCentered>
          </RowCentered>
        </SizedBoxWithElevation>
        <div className="chat__section">
          <ul>{fetchedChatList ? messagesStream() : null}</ul>
        </div>
      </Column>
      <div className="input-div">
        <textarea
          placeholder="Type your message here..."
          onKeyDown={onEnterPress}
        ></textarea>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedChatList: state.fetch.chatList,
    userInfo: state.fetch.userInfo,
  };
};

export default connect(mapStateToProps, {
  fetchChatList,
  fetchUserInfo,
})(Chat);
