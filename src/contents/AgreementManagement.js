import 동의서 from "../icons/동의서.png";
import 동의 from "../icons/동의.png";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
<<<<<<< HEAD
import { fetchParentList, fetchAgreementList } from "../actions";
=======
import {
  fetchParentList,
  fetchAgreementList,
  getNotifications,
  addNotifications,
} from "../actions";

const isDev = window.require('electron-is-dev');

// const { ipcRenderer } = window.require("electron");
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329

const AgreementManagement = ({
  fetchParentList,
  fetchAgreementList,
  fetchedParentList,
  fetchedAgreement,
<<<<<<< HEAD
=======
  getNotifications,
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
}) => {
  const [selected, setSelected] = useState(0);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const kindgartenList = ["새싹반", "햇님반", "달님반"];
  const dispatch = useDispatch();

  useEffect(() => {
    fetchParentList();
    fetchAgreementList();
  }, [fetchParentList, fetchAgreementList]);

  // const getID = async () => {
  //   const ids = (await firestore.collection("user").get()).docs.map(
  //     (doc) => doc.id
  //   );
  //   return ids;
  // };

  // useEffect(() => {
  //   getID().then((ids) => {
  //     const unsubscribes = [];
  //     for (var i = 0; i < ids.length; ++i) {
  //       const id = ids[i];
  //       unsubscribes.push(
  //         firestore
  //           .collection("user")
  //           .doc(id)
  //           .onSnapshot((snap) => {
  //             for (var j = 0; j < snap.data()["동의서"].length; ++j) {
  //               const data = snap.data()["동의서"][j]["isAgreed"];
  //               if (data === true) {
  //                 dispatch(fetchAgreementList);
  //               }
  //               // 동의 철회는 없음
  //             }
  //           })
  //       );
  //     }
  //     return () => unsubscribes.forEach((unsubscribe) => unsubscribe);
  //   });
  // }, [dispatch, fetchAgreementList, fetchedAgreement]);

  const renderMenu = () => {
    return kindgartenList.map((key, idx) => {
      return (
        <button
          className={`classname classname-${idx}`}
          style={{
            backgroundColor: selected === idx ? "CornflowerBlue" : "white",
          }}
          onClick={() => {
            setSelected(idx);
          }}
        >
          {key}
        </button>
      );
    });
  };

  const renderParentList = () => {
    if (!fetchedParentList) {
      return null;
    } else {
      return fetchedParentList.map((name, idx) => {
        return (
          <div className={"agreementmanagement__parent-list-item"}>
            <div className={"agreementmanagement__parent-list-item-name"}>
              {name}
            </div>
            <button
              className={`agreementmanagement__parent-list-item-button-${idx}`}
              style={{
                border:
                  selectedParent === idx
                    ? "1.5px solid CornflowerBlue"
                    : "1.5px solid black",
                boxShadow:
                  selectedParent === idx
                    ? "0.5px 1px 5px CornflowerBlue"
                    : "0.5px 1px 5px gray",
                color: selectedParent === idx ? "CornflowerBlue" : "gray",
              }}
              onClick={() => {
                setSelectedParent(idx);
                setSelectedName(name);
              }}
            >
              확인하기
            </button>
          </div>
        );
      });
    }
  };

  const consentIcon = (isAgreed) => {
    return (
      <div
        className="agreementmanagement-div-4__item-icon-container"
        style={{
          backgroundColor: isAgreed ? "lightgray" : "CornflowerBlue",
        }}
      >
        <img
          className="agreementmanagement-div-4__item-image"
          src={동의}
          alt="동의"
          style={{
            width: "1rem",
          }}
        />
      </div>
    );
  };

  const renderConsentStatementList = (_name) => {
    const agrList = fetchedAgreement[_name];
    return agrList != null
      ? Array.from(agrList).map((cur, idx) => {
          return (
            <div
              className={`agreementmanagement-div-4__container box-${idx + 1}`}
            >
              <div
                className={`agreementmanagement-div-4__item-${idx}`}
                style={{
                  border: cur["isAgreed"]
                    ? "3px solid lightgray"
                    : "3px solid CornflowerBlue",
                }}
              >
                <LinesEllipsis
                  className={"agreementmanagement-div-4__item-title"}
                  text={cur["title"]}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
                <LinesEllipsis
                  className={"agreementmanagement-div-4__item-subtitle"}
                  text={cur["contents"]}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
                <div className={"agreementmanagement-div-4__item-date"}>
                  {cur["createdAt"].toDate().toLocaleDateString("ko-KR")}
                </div>
                {consentIcon(cur["isAgreed"])}
                <div
                  onClick={() => {
                    const { BrowserWindow, ipcMain } =
                      window.require("@electron/remote");
                    let win = new BrowserWindow({
                      width: 600,
                      height: 800,
                      resizable: false,
                      webPreferences: {
                        contextIsolation: false,
                        nodeIntegration: true,
                      },
                    });
                    // dev
                    win.loadURL("http://localhost:3000/#/viewconsentform");
                    ipcMain.on("variable-request", (evt, arg) => {
                      evt.sender.send("variable-reply", [cur, _name]);
                    });
                    // production
                    // win.loadFile("build/index.html", { hash: "#/login" });
                  }}
                  className="agreementmanagement-div-4__item-more"
                >
                  더보기
                </div>
              </div>
            </div>
          );
        })
      : null;
  };

  const renderSwitch = () => {
    switch (selected) {
      case 0:
        return renderParentList();
      default:
        break;
    }
  };

  return (
    <div className="agreementmanagement">
      <div className="agreementmanagement-div-1">
        <img
          className="agreementmanagement__image"
          src={동의서}
          alt="content"
          style={{ width: "2.8rem" }}
        />
        <div className="agreementmanagement__title">동의서 관리</div>
      </div>
      <div className="agreementmanagement-div-2">{renderMenu()}</div>
      <div className="agreementmanagement-div-3">
        <div className="agreementmanagement__parent-list-title fixed">
          학부모 목록
        </div>
        <div className="agreementmanagement__parent-list-items">
          {renderSwitch()}
        </div>
      </div>
      <div className="agreementmanagement-div-4">
        <div className="agreementmanagement-div-4__header">
          {selectedParent !== null ? (
            <div>
              <div className="agreementmanagement-div-4__title">
                {`${selectedName} 학부모`}
              </div>
              <div className="agreementmanagement-div-4__subtitle">
                동의서 목록
              </div>
            </div>
          ) : null}
        </div>
        <div className="agreementmanagement-div-4__items">
          {selectedParent !== null
            ? renderConsentStatementList(selectedName)
            : null}
        </div>
      </div>
      <div className="agreementmanagement-div-5">
        <div className="agreementmanagement-div-5__container">
          <button
            onClick={() => {
<<<<<<< HEAD
              const { BrowserWindow } = window.require("@electron/remote");
=======
              const { BrowserWindow } = window.require("electron").remote;
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
              let win = new BrowserWindow({
                width: 1200,
                height: 1080,
                resizable: false,
                webPreferences: {
                  contextIsolation: false,
                  nodeIntegration: true,
                  enableRemoteModule: true,
                },
              });
<<<<<<< HEAD
              window
                .require("@electron/remote")
                .require("@electron/remote/main")
                .enable(win.webContents);
              // dev
              win.loadURL("http://localhost:3000/#/add");
              // production
              // win.loadFile("build/index.html", { hash: "#/add" });
              // win.webContents.openDevTools();
=======
              if(isDev) {
                win.loadURL("http://localhost:3000/#/add");
              } else {
                win.loadFile("build/index.html", {
                hash: "#/add",
              });
              }
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
              win.on("close", () => {
                const timer = setInterval(() => {
                  clearInterval(timer);
                  dispatch(fetchAgreementList);
                  // 1초 있다가 동의서 목록 불러옴
                }, 1000);
              });
            }}
            className="agreementmanagement-div-5__button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedParentList: Object.values(state.fetch.data),
    fetchedAgreement: state.fetch.agreement,
    notifications: state.fetch.notifications,
  };
};

export default connect(mapStateToProps, {
  fetchParentList,
  fetchAgreementList,
})(AgreementManagement);
