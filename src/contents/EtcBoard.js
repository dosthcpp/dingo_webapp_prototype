import React, { useRef, useState } from "react";
import pin from "../icons/pin.png";
import { RowCentered, RowNormal, Column } from "../layout";
import { firebaseStorage } from "../firebase";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const { ipcRenderer } = window;
const downloadsFolder = window.require("downloads-folder");

const EtcBoard = () => {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [dateStart, setDateStart] = useState(
    new Date(Date.now()).toLocaleDateString()
  );
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [dateEnd, setDateEnd] = useState(
    new Date(Date.now()).toLocaleDateString()
  );

  return (
    <div className="agreementBoard">
      <NotificationContainer />
      <Column>
        <div className="agreementBoard-header">
          <RowCentered>
            <img
              className="agreementBoard__image"
              src={pin}
              alt="pin-icon"
              style={{ width: "2.8rem" }}
            />
            <div className="agreementBoard__title">기타 자료실</div>
          </RowCentered>
        </div>
        <div className="agreementBoard-top_section">
          <RowCentered>
            <div className="agreementBoard-top_section-total">전체 1건</div>
            <div className="agreementBoard-top_section-button-wrapper">
              <span className="agreementBoard-top_section-button">글쓰기</span>
            </div>
          </RowCentered>
        </div>
        <div className="agreementBoard-content">
          <Column>
            <div className="agreementBoard-content__header">
              <RowCentered>
                <div className="agreementBoard-content__header_no">
                  게시물 번호
                </div>
                <div className="vl-board-title"></div>
                <div className="agreementBoard-content__header_title">제목</div>
                <div className="vl-board-title"></div>
                <div className="agreementBoard-content__header_writer">
                  사용자 이름
                </div>
                <div className="vl-board-title"></div>
                <div className="agreementBoard-content__header_date">
                  게시날짜
                </div>
                <div className="vl-board-title"></div>
                <div className="agreementBoard-content__header_views">
                  조회수
                </div>
              </RowCentered>
            </div>
            <div className="agreementBoard-content__items">
              <RowCentered>
                <div className="agreementBoard-content__item-1_no">1</div>
                <div className="vl-board"></div>
                <div
                  className="agreementBoard-content__item-1_title"
                  onClick={async () => {
                    const ref = await firebaseStorage.ref(
                      "/board/agreement/sample.pdf"
                    );
                    const url = await ref.getDownloadURL();
                    ipcRenderer.send("download", {
                      url,
                      properties: { directory: downloadsFolder() },
                    });
                    ipcRenderer.once("download complete", (event, filePath) => {
                      console.log(filePath);
                      NotificationManager.info(
                        "다운로드 폴더에 성공적으로 해당 파일이 저장되었습니다."
                      );
                    });
                  }}
                >
                  기타 예시입니다.
                </div>
                <div className="vl-board"></div>
                <div className="agreementBoard-content__item-1_writer">
                  이시우 선생님
                </div>
                <div className="vl-board"></div>
                <div className="agreementBoard-content__item-1_date">
                  2021-06-19
                </div>
                <div className="vl-board"></div>
                <div className="agreementBoard-content__item-1_views">10</div>
              </RowCentered>
              <hr className="solid" />
            </div>
          </Column>
        </div>
        <div className="agreementBoard-bottom_section">
          <RowNormal
            style={{
              justifyContent: "space-between",
            }}
          >
            <RowCentered>
              <div className="agreementBoard-bottom_section-label">검색</div>
              <input
                className="agreementBoard-bottom_section-input"
                type="text"
              />
            </RowCentered>
            <RowNormal>
              <Column className="agreementBoard-bottom_section-calendar-start">
                <RowCentered>
                  <div className="agreementBoard-bottom_section-calendar-start-label">
                    시작일
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
                          "시작일은 종료일과 같거나 보다 빨라야 합니다."
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
                    종료일
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
                          "종료일은 시작일과 같거나 보다 늦어야 합니다."
                        );
                        return;
                      }
                      setDateEnd(new Date(d).toLocaleDateString());
                      setShowEndCalendar(false);
                    }}
                  />
                ) : null}
              </Column>
            </RowNormal>
          </RowNormal>
        </div>
      </Column>
    </div>
  );
};

export default EtcBoard;
