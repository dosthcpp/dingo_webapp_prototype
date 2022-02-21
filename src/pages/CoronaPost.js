import React, { useEffect, useState } from "react";
import { RowCentered, RowNormal, Column, SizedBox } from "../layout";

import { connect } from "react-redux";

<<<<<<< HEAD
=======
const isDev = window.require('electron-is-dev');

>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
const ipcRenderer = window.require("electron").ipcRenderer;

const CoronaPost = () => {
  const [boardArray, setBoardArray] = useState([]);

  useEffect(() => {
    ipcRenderer.send("open");
    ipcRenderer.once("on-data", (_, store) => {
<<<<<<< HEAD
=======
      console.log(store);
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
      Array.from(store).map((item) => setBoardArray((old) => [...old, item]));
    });
  }, []);

  return (
    <div className="coronaPost">
      <Column>
        <div className="coronaPost-header">
          <div className="agreementBoard__title">코로나 지침 현황</div>
        </div>
        <div className="coronaPost-content">
          <Column>
            <div className="coronaPost-content__header">
              <RowCentered
                style={{
                  height: "2.5rem",
                }}
              >
                <div className="coronaPost-content__header_no">번호</div>
                <div className="coronaPost-content__header_title">제목</div>
                <div className="coronaPost-content__header_writer">작성자</div>
                <div className="coronaPost-content__header_date">게시일</div>
              </RowCentered>
            </div>
            <div className="coronaPost-content__items">
              <SizedBox height="2px" />
              {boardArray.map((coronaN, index) => (
                <div>
                  <RowCentered
                    style={{
                      height: "2rem",
                    }}
                  >
                    <div className="coronaPost-content__item_no">
                      {boardArray.length - index}
                    </div>
                    <div
                      className="coronaPost-content__item_title"
                      onClick={async () => {
                        const { BrowserWindow, ipcMain } =
                          window.require("@electron/remote");
                        const { download } = window.require("electron-dl");
                        const fileNames = {};
                        for (var i = 1; i < 100; ++i) {
                          if (!(`파일이름-${i}` in coronaN)) break;
                          fileNames[`fileInfo-${i}`] = {
                            파일이름: coronaN[`파일이름-${i}`],
                            파일주소: coronaN[`link-${i}`],
                          };
                        }
                        console.log(fileNames);
                        let win = new BrowserWindow({
                          width: 1200,
                          height: 800,
                          // resizable: false,
                          webPreferences: {
                            contextIsolation: false,
                            nodeIntegration: true,
                            enableRemoteModule: true,
                          },
                        });
                        ipcMain.once("open", (event, arg) => {
                          event.sender.send("vars", {
                            title: coronaN["제목"],
                            uploader: coronaN["업로더"],
                            date: coronaN["작성일"],
                            views: coronaN["조회수"],
                            content: coronaN["본문내용"],
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
                              event.sender.send(
                                "download complete",
                                dl.getSavePath()
                              )
                            )
                            .catch(console.error);
                        });
                        // win.webContents.openDevTools();
<<<<<<< HEAD
                        // dev
                        win.loadURL("http://localhost:3000/#/viewcoronapost");
                        // production
                        // win.loadFile("build/index.html", {
                        //   hash: "#/viewcoronapost",
                        // });
=======
                        if(isDev) {
                          win.loadURL("http://localhost:3000/#/viewcoronapost");
                        } else {
                          win.loadFile("build/index.html", {
                          hash: "#/viewcoronapost",
                        });
                        }
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
                      }}
                    >
                      {coronaN["제목"]}
                    </div>
                    <div className="coronaPost-content__item_writer">
                      {coronaN["업로더"]}
                    </div>
                    <div className="coronaPost-content__item_date">
                      {coronaN["작성일"]}
                    </div>
                    <div className="coronaPost-content__item_views">
                      {coronaN["조회수"]}
                    </div>
                  </RowCentered>
                  <hr className="solid" />
                </div>
              ))}
            </div>
          </Column>
        </div>
        <div></div>
        <div className="coronaPost-bottom_section">
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
                className="coronaPost-bottom_section-input"
                placeholder="내용을 검색하세요"
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
          </RowNormal>
        </div>
      </Column>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(CoronaPost);
