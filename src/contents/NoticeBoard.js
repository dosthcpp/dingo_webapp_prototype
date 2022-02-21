import React from "react";
import { RowCentered, RowNormal, Row, Column } from "../layout";

const NoticeBoard = () => {
  return (
    <div className="noticeBoard">
      <Column
        style={{
          width: "100%",
        }}
      >
        <div className="noticeBoard-header">
          <Row>
            <div className="noticeBoard__title">가정통신문 자료실</div>
          </Row>
        </div>
        <div className="noticeBoard-top_section">
          <button
            className="noticeBoard-top_section-button"
            onClick={() => {
              // const { BrowserWindow } = window.require("@electron/remote");
              // let win = new BrowserWindow({
              //   width: 600,
              //   height: 800,
              //   // resizable: false,
              //   webPreferences: {
              //     contextIsolation: false,
              //     nodeIntegration: true,
              //     enableRemoteModule: true,
              //   },
              // });
              // // dev
              // win.loadURL("http://localhost:3000/#/addBoard");
              // production
              //   win.loadFile("build/index.html", { hash: "#/chat" });
            }}
          >
            작성
          </button>
        </div>
        <div className="noticeBoard-content">
          <Column>
            <div className="noticeBoard-content__header">
              <RowCentered
                style={{
                  height: "2.5rem",
                }}
              >
                <div className="noticeBoard-content__header_no">번호</div>
                <div className="noticeBoard-content__header_title">제목</div>
                <div className="noticeBoard-content__header_writer">작성자</div>
                <div className="noticeBoard-content__header_date">게시일</div>
                <div className="noticeBoard-content__header_views">조회수</div>
              </RowCentered>
            </div>
            <div className="noticeBoard-content__items">{/** TODO*/}</div>
          </Column>
        </div>
        <div className="noticeBoard-bottom_section">
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
                className="noticeBoard-bottom_section-input"
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

export default NoticeBoard;
