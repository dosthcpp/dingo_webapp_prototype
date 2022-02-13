import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Column, Row, RowCentered, SizedBox } from "../layout";
import { NAV } from "../actions/types";

const isDev = window.require('electron-is-dev');

const SideMenu = () => {
  const [click, setClick] = useState(Array(4).fill(false));
  const dispatch = useDispatch();

  const collapseable = <span className="menu-list-collapseable">&#9656;</span>;
  const nonCollapseable = (
    <span className="menu-list-noncollapseable">&#9662;</span>
  );

  const renderMenu = () => {
    const menuTitle = [
      ["홈"],
      [
        "업무",
        [
          "출석부",
          "동의서 관리",
          "가정통신문 및 알림장 작성",
          "학부모 상담",
          "활동사진 업로드",
          "일정관리",
          "식단표 업로드",
        ],
      ],
      ["자료실", ["동의서", "가정통신문", "학습자료", "기타"]],
    ];

    return (
      <ul className="menu-no-3">
        {menuTitle.map((cur, idx) => {
          return cur[1] && cur[1].length !== 0 ? (
            <div>
              <li
                className={`menu-list-${idx}`}
                onClick={() => {
                  const state = [...click];
                  state[idx] = !state[idx];
                  setClick(state);
                }}
                key={idx}
              >
                {click[idx] ? nonCollapseable : collapseable}
                {cur[0]}
              </li>
              <ul
                className="submenu"
                style={{
                  display: click[idx] ? "block" : "none",
                }}
              >
                {cur[1].map((curMenu, idx) => {
                  return (
                    <li
                      className={`menu-list submenu-item-${idx + 1}`}
                      onClick={() => {
                        console.log(curMenu);
                        switch (curMenu) {
                          case "출석부":
                            dispatch({
                              type: NAV,
                              payload: 1,
                            });
                            break;
                          case "동의서 관리":
                            dispatch({
                              type: NAV,
                              payload: 2,
                            });
                            break;
                          case "가정통신문 및 알림장 작성":
                            dispatch({
                              type: NAV,
                              payload: 3,
                            });
                            break;
                          case "학부모 상담":
                            const { BrowserWindow } =
                              window.require("@electron/remote");
                            const remoteMain = window.require(
                              "@electron/remote/main"
                            );
                            let win = new BrowserWindow({
                              width: 600,
                              height: 800,
                              resizable: true,
                              webPreferences: {
                                contextIsolation: false,
                                nodeIntegration: true,
                                enableRemoteModule: true,
                              },
                            });
                            if(isDev) {
                              win.loadURL("http://localhost:3000/#/chat");
                            } else {
                              win.loadFile("build/index.html", {
                              hash: "#/chat",
                            });
                            }
                            remoteMain.enable(win.webContents);
                            break;
                          case "활동사진 업로드":
                            dispatch({
                              type: NAV,
                              payload: 5,
                            });
                            break;
                          case "동의서":
                            dispatch({
                              type: NAV,
                              payload: 6,
                            });
                            break;
                          case "가정통신문":
                            dispatch({
                              type: NAV,
                              payload: 7,
                            });
                            break;
                          case "학습자료":
                            dispatch({
                              type: NAV,
                              payload: 8,
                            });
                            break;
                          case "기타":
                            dispatch({
                              type: NAV,
                              payload: 9,
                            });
                            break;
                          case "일정관리":
                            dispatch({
                              type: NAV,
                              payload: 10,
                            });
                            break;
                          case "식단표 업로드":
                            dispatch({
                              type: NAV,
                              payload: 11,
                            });
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {curMenu}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : cur[0] === "홈" ? (
            <li
              className={`menu-list-${idx}`}
              onClick={
                cur[1]
                  ? null
                  : () => {
                      dispatch({
                        type: NAV,
                        payload: 0,
                      });
                    }
              }
            >
              {cur[1] ? collapseable : null}
              <span
                style={
                  cur[1]
                    ? null
                    : {
                        marginLeft: 8,
                      }
                }
              >
                {cur[0]}
              </span>
            </li>
          ) : (
            <div />
          );
        })}
      </ul>
    );
  };

  return (
    <div className="side-menu">
      <div className="menu-div-1">
        <Column>
          <div
            onClick={() => {
              const { BrowserWindow } = window.require("@electron/remote");
              const remoteMain = window.require("@electron/remote/main");
              let win = new BrowserWindow({
                width: 600,
                height: 800,
                // resizable: false,
                webPreferences: {
                  contextIsolation: false,
                  nodeIntegration: true,
                  enableRemoteModule: true,
                },
              });
              // win.webContents.openDevTools();
              if(isDev) {
                win.loadURL("http://localhost:3000/#/login");
              } else {
                win.loadFile("build/index.html", {
                hash: "#/login",
              });
              }
              remoteMain.enable(win.webContents);
            }}
            className="id-div__content title"
          >
            새싹 유치원
          </div>
          <div className="id-div__content email">abcd1234@gmail.com</div>
        </Column>
      </div>
      <div className="menu-div-2">
        <div className="menu-item">
          <div className="menu-title">빠른 검색</div>
        </div>
        <div className="menu-item">
          <div className="menu-title">모든 업데이트</div>
        </div>
        <div className="menu-item">
          <div className="menu-title">설정과 멤버</div>
        </div>
      </div>
      <div className="menu-div-3">
        <div className="menu-div__title">워크스페이스</div>
        {renderMenu()}
      </div>
      <div className="menu-div-4">
        <li className="menu-item">
          <div className="menu-title">템플릿</div>
        </li>
        <li className="menu-item">
          <div className="menu-title">가져오기</div>
        </li>
        <li className="menu-item">
          <div className="menu-title">휴지통</div>
        </li>
      </div>
    </div>
  );
};

export default SideMenu;
