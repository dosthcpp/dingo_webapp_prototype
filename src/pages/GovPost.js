import React, { useEffect, useState } from "react";
import { getGovNoti } from "../actions";
import { RowCentered, RowNormal, Column, SizedBox } from "../layout";

import { connect, useSelector } from "react-redux";

const isDev = window.require('electron-is-dev');

const GovPost = ({ getGovNoti }) => {
  const [boardArray, setBoardArray] = useState([]);
  const fetched = useSelector((state) => state.fetch.govNoti);

  useEffect(() => {
    Array.from(fetched)
      .slice(0, 6)
      .map((item) => setBoardArray((old) => [...old, item]));
  }, [fetched]);

  useEffect(() => {
    getGovNoti();
  }, [getGovNoti]);

  return (
    <div className="govPost">
      <Column>
        <div className="govPost-header">
          <div className="agreementBoard__title">정부 공문 게시판</div>
        </div>
        <div className="govPost-content">
          <Column>
            <div className="govPost-content__header">
              <RowCentered
                style={{
                  height: "2.5rem",
                }}
              >
                <div className="govPost-content__header_no">번호</div>
                <div className="govPost-content__header_title">제목</div>
                <div className="govPost-content__header_writer">작성자</div>
                <div className="govPost-content__header_date">게시일</div>
                <div className="govPost-content__header_views">조회수</div>
              </RowCentered>
            </div>
            <div className="govPost-content__items">
              <SizedBox height="2px" />
              {boardArray.map((govN, index) => (
                <div>
                  <RowCentered
                    style={{
                      height: "2rem",
                    }}
                  >
                    <div className="govPost-content__item_no">
                      {boardArray.length - index}
                    </div>
                    <div
                      className="govPost-content__item_title"
                      onClick={async () => {
                        const { BrowserWindow, ipcMain } =
                          window.require("@electron/remote");
                        const { download } = window.require("electron-dl");
                        const fileNames = {};
                        for (var i = 1; i < 100; ++i) {
                          if (!(`파일이름-${i}` in govN)) break;
                          fileNames[`fileInfo-${i}`] = {
                            파일이름: govN[`파일이름-${i}`],
                            파일주소: govN[`link-${i}`],
                          };
                        }
                        console.log(fileNames);
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
                        ipcMain.once("open", (event, arg) => {
                          event.sender.send("vars", {
                            title: govN["제목"],
                            uploader: govN["업로더"],
                            date: govN["등록일"],
                            views: govN["조회수"],
                            content: govN["본문내용"],
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
                        if(isDev) {
                          win.loadURL("http://localhost:3000/#/viewgovpost");
                        } else {
                          win.loadFile("build/index.html", {
                          hash: "#/viewgovpost",
                        });
                        }
                      }}
                    >
                      {govN["제목"]}
                    </div>
                    <div className="govPost-content__item_writer">
                      {govN["업로더"]}
                    </div>
                    <div className="govPost-content__item_date">
                      {govN["등록일"]}
                    </div>
                    <div className="govPost-content__item_views">
                      {govN["조회수"]}
                    </div>
                  </RowCentered>
                  <hr className="solid" />
                </div>
              ))}
            </div>
          </Column>
        </div>
        <div></div>
        <div className="govPost-bottom_section">
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
                className="govPost-bottom_section-input"
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

export default connect(mapStateToProps, {
  getGovNoti,
})(GovPost);
