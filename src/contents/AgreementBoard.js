import React, { useCallback, useEffect, useState } from "react";
import { fetchAgreementBoard } from "../actions";
import { RowCentered, RowNormal, Column, SizedBox } from "../layout";
import { firestore } from "../firebase";

import { connect, useDispatch, useSelector } from "react-redux";
import { DID_FETCH_BOARD } from "../actions/types";

<<<<<<< HEAD
=======
const isDev = window.require('electron-is-dev');

>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
const AgreementBoard = ({
  didFetchBoard,
  fetchAgreementBoard,
  fetchedBoardList,
}) => {
  const [boardArray, setBoardArray] = useState([]);
  const [_views, setViews] = useState([]);
  const dispatch = useDispatch();
  const fetched = useSelector((state) => state.fetch.agreementBoard);

  const board = useCallback(
    (cb, index, title, uploader, date, views, id, content, fileNames) => (
      <div>
        <RowCentered
          style={{
            height: "2rem",
          }}
        >
          <div className="agreementBoard-content__item_no">{index}</div>
          <div
            className="agreementBoard-content__item_title"
            onClick={async () => {
              cb();

              const { BrowserWindow, ipcMain } =
                window.require("@electron/remote");
              const { download } = window.require("electron-dl");

              let win = new BrowserWindow({
                width: 600,
                height: 800,
                // resizable: false,
                webPreferences: {
                  contextIsolation: false,
                  nodeIntegration: true,
                  // enableRemoteModule: true,
                },
              });
              ipcMain.once("open", (event, arg) => {
                event.sender.send("vars", {
                  title,
                  uploader,
                  date,
                  views: views,
                  id,
                  content,
                  fileNames,
                });
              });
              ipcMain.on("download", async (event, info) => {
                info.properties.onProgress = (status) =>
                  event.sender.send("download progress", status);
                await download(
                  BrowserWindow.getFocusedWindow(),
                  info.url,
                  info.properties
                )
                  .then((dl) =>
                    event.sender.send("download complete", dl.getSavePath())
                  )
                  .catch(console.error);
              });

              // win.webContents.openDevTools();
<<<<<<< HEAD
              // dev
              win.loadURL("http://localhost:3000/#/viewBoard");
              // production
              // win.loadFile("build/index.html", { hash: "#/viewBoard" });
=======
              if(isDev) {
                win.loadURL("http://localhost:3000/#/viewBoard");
              } else {
                win.loadFile("build/index.html", {
                hash: "#/viewBoard",
              });
              }
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
            }}
          >
            {title}
          </div>
          <div className="agreementBoard-content__item_writer">
            {`${uploader} ?????????`}
          </div>
          <div className="agreementBoard-content__item_date">
            {dateString(date)}
          </div>
          <div className="agreementBoard-content__item_views">{views}</div>
        </RowCentered>
        <hr className="solid" />
      </div>
    ),
    []
  );

  const dateString = (date) => {
    const d = new Date(date);
    const curYear = d.getFullYear();
    const curMonth = d.getMonth() + 1;
    const curDay = d.getDate();
    return `${curYear}-${curMonth >= 10 ? curMonth : `0${curMonth}`}-${
      curDay >= 10 ? curDay : `0${curDay}`
    }`;
  };

  useEffect(() => {
    if (!didFetchBoard) {
      fetchAgreementBoard();
      dispatch({
        type: DID_FETCH_BOARD,
        payload: true,
      });
    }
  }, [fetchAgreementBoard, didFetchBoard, dispatch]);

  const setBoard = useCallback(
    (fetchedBoardList) => {
      const li = Array.from(fetchedBoardList);
      li.forEach((boardList, index) => {
        setBoardArray((old) => [
          ...old,
          board(
            async () => {
              boardList["views"] = boardList["views"] + 1;
              const _id = (
                await firestore
                  .collection("agreementBoard")
                  .where("postIdentifier", "==", boardList["postIdentifier"])
                  .get()
              ).docs[0].id;
              firestore.collection("agreementBoard").doc(_id).update({
                views: boardList["views"],
              });
            },
            li.length - index,
            boardList["title"],
            boardList["uploader"],
            new Date(boardList["date"].toDate()),
            boardList["views"],
            boardList["postIdentifier"],
            boardList["content"],
            boardList["fileNames"]
          ),
        ]);
      });
    },
    [board]
  );

  useEffect(() => {
    setBoard(fetched);
<<<<<<< HEAD
    Array.from(fetchedBoardList)
      .slice(0, 11)
      .forEach((boardList) => {
        setViews((old) => [...old, boardList["views"]]);
      });
=======
    Array.from(fetchedBoardList).forEach((boardList) => {
      setViews((old) => [...old, boardList["views"]]);
    });
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
  }, [fetchedBoardList, setBoardArray, board, setBoard, fetched]);

  // useEffect(() => {
  //   const unsubscribe = firestore
  //     .collection("agreementBoard")
  //     .onSnapshot((snap) => {
  //       snap.docChanges().forEach((change) => {
  //         if (change.doc.data() !== null && boardArray.length !== 0) {
  //           if (snap.docs.length > boardArray.length) {
  //             setBoardArray([]);
  //             fetchAgreementBoard();
  //             NotificationManager.info("????????? ???????????? ?????????????????????.");
  //           } else if (snap.docs.length < boardArray.length) {
  //             setBoardArray([]);
  //             fetchAgreementBoard();
  //             NotificationManager.info("???????????? ?????????????????????.");
  //           }
  //         }
  //       });
  //     });
  //   return unsubscribe;
  // }, [boardArray.length, fetchAgreementBoard, didFetchBoard]);

  return (
    <div className="agreementBoard">
      <Column
        style={{
          width: "100%",
        }}
      >
        <div className="agreementBoard-header">
          <div className="agreementBoard__title">????????? ?????????</div>
        </div>
        <div className="agreementBoard-top_section">
          <button
            className="agreementBoard-top_section-button"
            onClick={() => {
              const { BrowserWindow } = window.require("@electron/remote");
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
<<<<<<< HEAD
              // win.webContents.openDevTools();
              window
                .require("@electron/remote")
                .require("@electron/remote/main")
                .enable(win.webContents);
              // dev
              win.loadURL("http://localhost:3000/#/addBoard");
              win.on("close", () => {
                setBoardArray([]);
                fetchAgreementBoard();
                dispatch({
                  type: DID_FETCH_BOARD,
                  payload: true,
                });
              });
              // production
              // win.loadFile("build/index.html", { hash: "#/addBoard" });
=======
              if(isDev) {
                win.loadURL("http://localhost:3000/#/addBoard");
              } else {
                win.loadFile("build/index.html", {
                hash: "#/addBoard",
              });
              }
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
            }}
          >
            ??????
          </button>
        </div>
        <div className="agreementBoard-content">
          <Column>
            <div className="agreementBoard-content__header">
              <RowCentered
                style={{
                  height: "2.5rem",
                }}
              >
                <div className="agreementBoard-content__header_no">??????</div>
                <div className="agreementBoard-content__header_title">??????</div>
                <div className="agreementBoard-content__header_writer">
                  ?????????
                </div>
                <div className="agreementBoard-content__header_date">
                  ?????????
                </div>
                <div className="agreementBoard-content__header_views">
                  ?????????
                </div>
              </RowCentered>
            </div>
            <div className="agreementBoard-content__items">
              <SizedBox height="2px" />
              {boardArray}
            </div>
          </Column>
        </div>
        <div className="agreementBoard-bottom_section">
          <RowNormal
            style={{
              width: "80rem",
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "0 auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                className="agreementBoard-bottom_section-input"
                placeholder="????????? ???????????????"
                type="text"
              />
              <button
                style={{
                  height: "39px",
                  width: "50px",
                  backgroundColor: "#697fef",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"
                  />
                </svg>
              </button>
            </div>
            {/* <RowNormal>
              <Column className="agreementBoard-bottom_section-calendar-start">
                <RowCentered>
                  <div className="agreementBoard-bottom_section-calendar-start-label">
                    ?????????
                  </div>
                  <input
                    className="agreementBoard-bottom_section-calendar-start-input"
                    type="text"
                    value={dateStart}
                    onChange={(e) => {}}
                    readOnly={true}
                    onFocus={() => {
                      if (showEndCalendar) {
                        setShowEndCalendar(false);
                      }
                      setShowStartCalendar(true);
                    }}
                  />
                </RowCentered>
                {showStartCalendar ? (
                  <Calendar
                    className="agreementBoard-calendar-start"
                    onClickDay={(d) => {
                      if (new Date(d) > new Date(dateEnd)) {
                        NotificationManager.warning(
                          "???????????? ???????????? ????????? ?????? ????????? ?????????."
                        );
                        return;
                      }
                      setDateStart(new Date(d).toLocaleDateString());
                      setShowStartCalendar(false);
                    }}
                  />
                ) : null}
              </Column>
              <Column className="agreementBoard-bottom_section-calendar-end">
                <RowCentered>
                  <div className="agreementBoard-bottom_section-calendar-end-label">
                    ?????????
                  </div>
                  <input
                    className="agreementBoard-bottom_section-calendar-start-input"
                    type="text"
                    value={dateEnd}
                    onChange={(e) => {}}
                    readOnly={true}
                    onFocus={() => {
                      if (showStartCalendar) {
                        setShowStartCalendar(false);
                      }
                      setShowEndCalendar(true);
                    }}
                  />
                </RowCentered>
                {showEndCalendar ? (
                  <Calendar
                    className="agreementBoard-calendar-end"
                    onClickDay={(d) => {
                      if (new Date(d) < new Date(dateStart)) {
                        NotificationManager.warning(
                          "???????????? ???????????? ????????? ?????? ????????? ?????????."
                        );
                        return;
                      }
                      setDateEnd(new Date(d).toLocaleDateString());
                      setShowEndCalendar(false);
                    }}
                  />
                ) : null}
              </Column>
            </RowNormal> */}
          </RowNormal>
        </div>
      </Column>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedBoardList: state.fetch.agreementBoard,
    didFetchBoard: state.fetch.didFetchBoard,
  };
};

export default connect(mapStateToProps, {
  fetchAgreementBoard,
})(AgreementBoard);
