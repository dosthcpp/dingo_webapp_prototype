import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchChatList } from "../actions";
import { connect } from "react-redux";
import { firestore } from "../firebase";
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

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Chat = ({ fetchedChatList, fetchChatList }) => {
  const [currentUser, setCurrentUser] = useState("abcd1234@gmail.com");
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
  const chatWindowRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("messageList")
      .onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          if (change.doc.data() !== null) {
            dispatch(fetchChatList);
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
    return (
      <li
        style={{
          marginTop: "10px",
        }}
      >
        <RowCentered
          style={{
            justifyContent:
              chat["sender"] === currentUser ? "flex-end" : "flex-start",
          }}
        >
          {chat["sender"] !== currentUser ? (
            <img src={icon} alt="아이콘" />
          ) : null}
          {chat["sender"] === currentUser ? (
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
                textAlign: chat["sender"] !== currentUser ? "start" : "end",
              }}
            >
              {chat["sender"] !== currentUser
                ? `[${chat["className"]}] ${chat["childName"]} 학부모님`
                : `새싹반 선생님`}
            </div>
            <div
              className="message"
              style={{
                borderRadius:
                  chat["sender"] !== currentUser
                    ? "20px 20px 20px 0px"
                    : "20px 20px 0px 20px",
                backgroundColor:
                  chat["sender"] !== currentUser ? "#474f54" : "#318cea",
              }}
            >
              {chat["text"]}
            </div>
          </Column>
          <SizedBox width="10px" />
          {chat["sender"] !== currentUser ? (
            <div
              style={{
                alignSelf: "flex-end",
              }}
            >{`${parseDate(chat["time"])}`}</div>
          ) : null}
          {chat["sender"] === currentUser ? (
            <img src={icon} alt="아이콘" />
          ) : null}
        </RowCentered>
      </li>
    );
  };

  const messagesStream = () => {
    const messageList = [];
    const chatList = Array.from(fetchedChatList);
    chatList.sort((a, b) => a["time"] > b["time"]);
    console.log(chatList); // 비동기 함수가 아니기 떄문에 chatlist를 Fetch하는 동안 먼저 console.log함수가 실행됨
    for (var i = 0; i < chatList.length; ++i) {
      if (i === 0) {
        messageList.push(customDivider(new Date(chatList[i]["time"])));
      }
      messageList.push(chatBubble(chatList[i]));
      if (
        i !== chatList.length - 1 &&
        chatList[i]["time"].toString().split(" ")[0] !==
          chatList[i + 1]["time"].toString().split(" ")[0]
      ) {
        console.log(chatList[i]["time"].toString().split(" ")[0]);
        console.log(chatList[i + 1]["time"].toString().split(" ")[0]);
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
      try {
        const _date = new Date();
        firestore.collection("messageList").add({
          className: "새싹반",
          sender: currentUser,
          text: e.target.value,
          time: parseDateForFirebase(_date),
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
              <img src={icon} alt="아이콘" />
              <SizedBox width="10px" />
              <ColumnCentered>
                <div className="chat__class" ref={headerRef}>
                  희망유치원 희망반
                </div>
                <div className="chat__sender" ref={headerRef}>
                  백도인 학부모님
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
  };
};

export default connect(mapStateToProps, {
  fetchChatList,
})(Chat);
