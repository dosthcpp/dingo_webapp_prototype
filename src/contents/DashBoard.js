import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Row, RowCentered, Column, SizedBox } from "../layout";
import { getGovNoti, getCoronaNoti, getPm } from "../actions";
<<<<<<< HEAD
import { connect, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";

=======
import { connect, useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";

const isDev = window.require('electron-is-dev');

>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
export const RC = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DashBoard = ({ getGovNoti, getCoronaNoti, getPm, useLayout }) => {
  const today = new Date(Date.now());
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const thedayaftertomorrow = new Date();
  thedayaftertomorrow.setDate(today.getDate() + 2);
  // const [message, setMessage] = useState("");
  // const [messageBubbles, setMessageBubbles] = useState([
  //   <MessageBubbleContainer>
  //     <div className="card__service_center-message_bubble-chatbot">
  //       <div className="card__service_center-message_bubble-chatbot-tip"></div>
  //       프로그램 사용에 어려움이 있으신가요?
  //     </div>
  //   </MessageBubbleContainer>,
  // ]);
  const gov = useSelector((state) => state.fetch.govNoti);
  const corona = useSelector((state) => state.fetch.coronaNoti);
  const pm = useSelector((state) => state.fetch.pm);
  const [option, setOption] = useState({});
  const [series, setSeries] = useState([]);
  const [govNf, setGovNf] = useState([]);
  const [coronaNf, setCoronaNf] = useState([]);

  const [top, setTop] = useState({
    impNotiTop: 0,
    kindNotiTop: 270,
    shiftNotiTop: 0,
    govNotiTop: 270,
    dailyTop: 0,
    workCheckTop: 367,
    coronaNotiTop: 0,
    serviceCenterTop: 413,
  });
  const [left, setLeft] = useState({
    impNotiLeft: 70,
    kindNotiLeft: 70,
    shiftNotiLeft: 440,
    govNotiLeft: 440,
    dailyLeft: 810,
    workCheckLeft: 810,
    coronaNotiLeft: 1180,
    serviceCenterLeft: 1180,
  });
  const [height, setHeight] = useState({
    impNotiHeight: 180,
    kindNotiHeight: 465,
    shiftNotiHeight: 180,
    govNotiHeight: 465,
    dailyHeight: 277,
    workCheckHeight: 370,
    coronaNotiHeight: 323,
    serviceCenterHeight: 323,
  });
  const [width, setWidth] = useState({
    impNotiWidth: 300,
    kindNotiWidth: 300,
    shiftNotiWidth: 300,
    govNotiWidth: 300,
    dailyWidth: 300,
    workCheckWidth: 300,
    coronaNotiWidth: 300,
    serviceCenterWidth: 300,
  });

  const inRange = (x, min, max) => {
    return (x - min) * (x - max) <= 0;
  };

  const dummyHandle = (use) => (use ? <div /> : null);

  const getParentName = (x) => {
    let y = x;
    let cn = y.className;
    if (cn.startsWith("card")) return cn;
    let i = 0;
    try {
      for (; i < 100 && !cn.startsWith("card"); ++i) {
        y = y.parentElement;
        cn = y.className;
      }
      if (i < 100) {
        return cn;
      } else {
        return "undraggable";
      }
    } catch (e) {
      return "undraggable";
    }
  };

  useEffect(() => {
    getGovNoti();
    getCoronaNoti();
    getPm();
  }, [getGovNoti, getCoronaNoti, getPm]);

  useEffect(() => {
    const pm2 = pm?.historical?.pm2?.data;
    const pm10 = pm?.historical?.pm10?.data;
    let labels = pm?.historical?.labels?.map((label) => {
      const d = new Date(label);
      return d.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    });
    setOption({
      chart: {
        id: "line",
      },
      xaxis: {
        categories: labels,
      },
    });
    setSeries([
      {
        name: "pm2.5",
        data: pm2,
      },
      {
        name: "pm10",
        data: pm10,
      },
    ]);
  }, [pm, setOption]);

  useEffect(() => {
    if (gov) {
      setGovNf(Array.from(gov).slice(0, 6));
    }
    if (corona) {
      setCoronaNf(Array.from(corona).slice(0, 4));
    }
  }, [gov, corona]);

  const seperator = (width) => {
    return (
      <Column>
        <SizedBox height={width} />
        <hr className="card-sep" />
        <SizedBox height={width} />
      </Column>
    );
  };

  const plainString = (htmlString) => {
    return htmlString.replace(/<[^>]+>/g, "");
  };

  return (
    <div
      className="dashboard"
      style={{
        paddingLeft: "70px",
        position: "relative",
      }}
    >
      <ResizableBox
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragStart={(e) => {}}
        onDragEnd={(e) => {
          e.preventDefault();
          const pn = getParentName(
            document.elementFromPoint(e.clientX, e.clientY)
          );
          if (pn.includes("shift_noti")) {
            const shift = left.shiftNotiLeft;
            const imp = left.impNotiLeft;
            setLeft((left) => ({
              ...left,
              impNotiLeft: shift,
              shiftNotiLeft: imp,
            }));
          }
        }}
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        height={height.impNotiHeight}
        width={width.impNotiWidth}
        style={{
          left: `${left.impNotiLeft}px`,
        }}
        resizeHandles={["s", "e", "se"]}
        minConstraints={[
          inRange(
            height.kindNotiHeight,
            height.govNotiHeight - 15,
            height.govNotiHeight + 15
          ) ||
          inRange(
            height.govNotiHeight,
            height.kindNotiHeight - 15,
            height.kindNotiHeight + 15
          )
            ? 0
            : width.kindNotiWidth,
          inRange(
            width.govNotiWidth,
            width.shiftNotiWidth - 15,
            width.shiftNotiWidth + 15
          ) ||
          inRange(
            width.shiftNotiWidth,
            width.govNotiWidth - 15,
            width.govNotiWidth + 15
          )
            ? 0
            : height.shiftNotiHeight,
        ]}
        // width, height
        maxConstraints={[
          inRange(
            height.kindNotiHeight,
            height.govNotiHeight - 15,
            height.govNotiHeight + 15
          ) ||
          inRange(
            height.govNotiHeight,
            height.kindNotiHeight - 15,
            height.kindNotiHeight + 15
          )
            ? Infinity
            : width.kindNotiWidth,
          // width.govNotiWidth !== width.shiftNotiWidth
          inRange(
            width.govNotiWidth,
            width.shiftNotiWidth - 15,
            width.shiftNotiWidth + 15
          ) ||
          inRange(
            width.shiftNotiWidth,
            width.govNotiWidth - 15,
            width.govNotiWidth + 15
          )
            ? Infinity
            : height.shiftNotiHeight,
        ]}
        onResize={(e, data) => {
          const _width = data.size.width;
          const _height = data.size.height;
          if (data.handle === "s") {
            setTop((top) => ({
              ...top,
              kindNotiTop: _height + 90,
            }));
            setHeight((height) => ({
              ...height,
              kindNotiHeight: 645 - _height,
              impNotiHeight: _height,
            }));
          }
          if (data.handle === "e") {
            setLeft((left) => ({
              ...left,
              shiftNotiLeft: _width + 140,
            }));
            setWidth((width) => ({
              ...width,
              shiftNotiWidth: 600 - _width,
              impNotiWidth: _width,
            }));
          }
          if (data.handle === "se") {
            setTop((top) => ({
              ...top,
              govNotiTop: _height + 90,
              kindNotiTop: _height + 90,
            }));
            setLeft((left) => ({
              ...left,
              govNotiLeft: _width + 140,
              shiftNotiLeft: _width + 140,
            }));
            setWidth((width) => ({
              ...width,
              govNotiWidth: 600 - _width,
              shiftNotiWidth: 600 - _width,
              kindNotiWidth: _width,
              impNotiWidth: _width,
            }));
            setHeight((height) => ({
              ...height,
              govNotiHeight: 645 - _height,
              kindNotiHeight: 645 - _height,
              shiftNotiHeight: _height,
              impNotiHeight: _height,
            }));
          }
        }}
        className={`card card__impNoti ${useLayout === 2 ? "drag-active" : ""}`}
      >
        <div className="card__impNoti-title">중요 알림</div>
        <div
          style={{
            paddingTop: "16px",
          }}
        >
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__impNoti_item_title-1">
                [알림] 딩고 서버 점검 안내
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__impNoti_item_time-1"
              >
                7시간 전
              </div>
            </Row>
            <div className="card__impNoti_item_content-1">
              금일 09시부터 12시까지 서버 점검으로 인하여...
            </div>
          </Column>
          {seperator("15px")}
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__impNoti_item_title-2">출석부 제출 안내</div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__impNoti_item_time-2"
              >
                8시간 전
              </div>
            </Row>
            <div className="card__impNoti_item_content-2">
              각 반 평가제 대비 원아 출석부 기한내 제출 바랍...
            </div>
          </Column>
        </div>
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          left: `${left.kindNotiLeft}px`,
          top: `${top.kindNotiTop}px`,
        }}
        resizeHandles={["e"]}
        width={width.kindNotiWidth}
        height={height.kindNotiHeight}
        maxConstraints={[
          inRange(
            height.impNotiHeight,
            height.shiftNotiHeight - 15,
            height.shiftNotiHeight + 15
          ) ||
          inRange(
            height.shiftNotiHeight,
            height.impNotiHeight - 15,
            height.impNotiHeight + 15
          )
            ? Infinity
            : width.impNotiWidth,
          Infinity,
        ]}
        minConstraints={[
          inRange(
            height.impNotiHeight,
            height.shiftNotiHeight - 15,
            height.shiftNotiHeight + 15
          ) ||
          inRange(
            height.shiftNotiHeight,
            height.impNotiHeight - 15,
            height.impNotiHeight + 15
          )
            ? 0
            : width.impNotiWidth,
          0,
        ]}
        onResize={(e, data) => {
          const _width = data.size.width;
          if (data.handle === "e") {
            setLeft((left) => ({
              ...left,
              govNotiLeft: _width + 140,
            }));
            setWidth((width) => ({
              ...width,
              govNotiWidth: 600 - _width,
              kindNotiWidth: _width,
            }));
          }
        }}
        onDragEnd={(e) => {
          console.log(e);
        }}
        className={`card card__kind_noti ${
          useLayout === 2 ? "drag-active" : ""
        }`}
      >
        <div className="card__kind_noti-title">유치원 공지 알림</div>
        <div
          style={{
            paddingTop: "16px",
          }}
        >
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__kind_noti_item_title-1">원아 모집</div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__kind_noti_item_time-1"
              >
                7시간 전
              </div>
            </Row>
            <div className="card__kind_noti_item_content-1">
              우리 아이를 위한 행복한 유치원 선택, '처음학교로'...
            </div>
          </Column>
          {seperator("15px")}
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__kind_noti_item_title-2">
                2021학년도 새싹유치원 원아모집...
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__kind_noti_item_time-2"
              >
                14시간 전
              </div>
            </Row>
            <div className="card__kind_noti_item_content-2">
              2021학년도 새싹유치원 유아 우선, 일반요집 요강을...
            </div>
          </Column>
          {seperator("15px")}
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__kind_noti_item_title-3">
                2021학년도 제 1회 1기 새싹유치원...
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__kind_noti_item_time-3"
              >
                어제
              </div>
            </Row>
            <div className="card__kind_noti_item_content-3">
              2021학년도 제 2회 1기 새싹유치원운영위원회를...
            </div>
          </Column>
          {seperator("15px")}
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__kind_noti_item_title-4">학사일정 안내</div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__kind_noti_item_time-4"
              >
                2021.06.16
              </div>
            </Row>
            <div className="card__kind_noti_item_content-4">
              코로나바이러스감염증-19로 인하여 교육부는...
            </div>
          </Column>
          {seperator("15px")}
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__kind_noti_item_title-5">
                어린이 인플루엔자 무료예방...
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__kind_noti_item_time-5"
              >
                2021.06.15
              </div>
            </Row>
            <div className="card__kind_noti_item_content-5">
              인플루엔자 무료예방접종 관련하여 다음과 같이 공지...
            </div>
          </Column>
          {seperator("15px")}
          <Column>
            <Row
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="card__kind_noti_item_title-6">
                2021년 가족축제 취소 알림
              </div>
              <div
                style={{
                  position: "relative",
                  top: "-5px",
                }}
                className="card__kind_noti_item_time-6"
              >
                2021.06.15
              </div>
            </Row>
            <div className="card__kind_noti_item_content-6">
              코로나바이러스로 인하여 2021년 예정이었던...
            </div>
          </Column>
        </div>
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          top: `${top.shiftNotiTop}px`,
          left: `${left.shiftNotiLeft}px`,
        }}
        width={width.shiftNotiWidth}
        height={height.shiftNotiHeight}
        resizeHandles={["s"]}
        minConstraints={[
          0,
          inRange(
            width.kindNotiWidth,
            width.impNotiWidth - 15,
            width.impNotiWidth + 15
          ) ||
          inRange(
            width.impNotiWidth,
            width.kindNotiWidth - 15,
            width.kindNotiWidth + 15
          )
            ? 0
            : width.impNotiWidth,
        ]}
        maxConstraints={[
          Infinity,
          inRange(
            width.kindNotiWidth,
            width.impNotiWidth - 15,
            width.impNotiWidth + 15
          ) ||
          inRange(
            width.impNotiWidth,
            width.kindNotiWidth - 15,
            width.kindNotiWidth + 15
          )
            ? Infinity
            : width.impNotiWidth,
        ]}
        onResize={(e, data) => {
          const _height = data.size.height;
          if (data.handle === "s") {
            setTop((top) => ({
              ...top,
              govNotiTop: _height + 90,
            }));
            setHeight((height) => ({
              ...height,
              govNotiHeight: 645 - _height,
              shiftNotiHeight: _height,
            }));
          }
        }}
        className={`card card__shift_noti ${
          useLayout === 2 ? "drag-active" : ""
        }`}
      >
        <div className="card__shift_noti-title">당직 알림</div>
        <RowCentered
          style={{
            paddingTop: "30px",
          }}
        >
          <Column>
            <div className="card__shift_noti_day-1">
              {`${today.getMonth() + 1}월 ${today.getDate()}일`}
            </div>
            <SizedBox height="15px" />
            <div className="card__shift_noti_self-1">이시우 선생님</div>
            <div className="card__shift_noti_self-1">김연지 선생님</div>
          </Column>
          <div className="vl-normal-noti"></div>
          <Column>
            <div className="card__shift_noti_day-2">
              {`${tomorrow.getMonth() + 1}월 ${tomorrow.getDate()}일`}
            </div>
            <SizedBox height="15px" />
            <div className="card__shift_noti_self-2">박희연 선생님</div>
            <div className="card__shift_noti_self-2">조수민 선생님</div>
          </Column>
          <div className="vl-normal-noti"></div>
          <Column>
            <div className="card__shift_noti_day-3">
              {`${
                thedayaftertomorrow.getMonth() + 1
              }월 ${thedayaftertomorrow.getDate()}일`}
            </div>
            <SizedBox height="15px" />
            <div className="card__shift_noti_self-3">이시우 선생님</div>
            <div className="card__shift_noti_self-3">김모모 선생님</div>
          </Column>
        </RowCentered>
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          top: `${top.govNotiTop}px`,
          left: `${left.govNotiLeft}px`,
        }}
        width={width.govNotiWidth}
        height={height.govNotiHeight}
        className={`card card__gov_noti ${
          useLayout === 2 ? "drag-active" : ""
        }`}
      >
        <Row
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="card__gov_noti-title">정부 공문 알림</div>
          <div
            className="card__gov_noti-title-more"
            onClick={() => {
              const { BrowserWindow } = window.require("@electron/remote");
              let win = new BrowserWindow({
                width: 1450,
                height: 800,
                resizable: false,
                webPreferences: {
                  contextIsolation: false,
                  nodeIntegration: true,
                  enableRemoteModule: true,
                },
              });
              window
                .require("@electron/remote")
                .require("@electron/remote/main")
                .enable(win.webContents);
              // win.webContents.openDevTools();
<<<<<<< HEAD
              // dev
              win.loadURL("http://localhost:3000/#/govpost");
              // production
              // win.loadFile("build/index.html", { hash: "#/govpost" });
=======
              if(isDev) {
                win.loadURL("http://localhost:3000/#/govpost");
              } else {
                win.loadFile("build/index.html", {
                hash: "#/govpost",
              });
              }
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
            }}
          >
            더 보기
          </div>
        </Row>
        <div
          style={{
            paddingTop: "16px",
          }}
        />
        {govNf.map((govN, index) => {
          return (
            <div>
              <Column>
                <Row
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <div className={`card__gov_noti_item_title-${index + 1}`}>
                    {govN["제목"].substring(0, 15)}...
                  </div>
                  <div
                    style={{
                      position: "relative",
                      top: "-5px",
                    }}
                    className={`card__gov_noti_item_time-${index + 1}`}
                  >
                    {govN["등록일"]}
                  </div>
                </Row>
                <div className={`card__gov_noti_item_content-${index + 1}`}>
                  {govN["본문내용"].substring(0, 25)}...
                </div>
              </Column>
              {index < govNf.length - 1 ? seperator("15px") : <div />}
            </div>
          );
        })}
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          top: `${top.dailyTop}px`,
          left: `${left.dailyLeft}px`,
        }}
        height={height.dailyHeight}
        width={width.dailyWidth}
        resizeHandles={["s", "e", "se"]}
        minConstraints={[
          inRange(
            height.workCheckHeight,
            height.serviceCenterHeight - 15,
            height.serviceCenterHeight + 15
          ) ||
          inRange(
            height.serviceCenterHeight,
            height.workCheckHeight - 15,
            height.workCheckHeight + 15
          )
            ? 0
            : width.workCheckWidth,
          inRange(
            width.coronaNotiWidth,
            width.serviceCenterWidth - 15,
            width.serviceCenterWidth + 15
          ) ||
          inRange(
            width.serviceCenterWidth,
            width.coronaNotiWidth - 15,
            width.coronaNotiWidth + 15
          )
            ? 0
            : height.coronaNotiHeight,
        ]}
        // width, height
        maxConstraints={[
          inRange(
            height.workCheckHeight,
            height.serviceCenterHeight - 15,
            height.serviceCenterHeight + 15
          ) ||
          inRange(
            height.serviceCenterHeight,
            height.workCheckHeight - 15,
            height.workCheckHeight + 15
          )
            ? Infinity
            : width.workCheckWidth,
          // width.govNotiWidth !== width.shiftNotiWidth
          inRange(
            width.serviceCenterWidth,
            width.coronaNotiWidth - 15,
            width.coronaNotiWidth + 15
          ) ||
          inRange(
            width.coronaNotiWidth,
            width.serviceCenterWidth - 15,
            width.serviceCenterWidth + 15
          )
            ? Infinity
            : height.coronaNotiHeight,
        ]}
        onResize={(e, data) => {
          const _width = data.size.width;
          const _height = data.size.height;
          if (data.handle === "s") {
            setTop((top) => ({
              ...top,
              workCheckTop: _height + 90,
            }));
            setHeight((height) => ({
              ...height,
              workCheckHeight: 645 - _height,
              dailyHeight: _height,
            }));
          }
          if (data.handle === "e") {
            setLeft((left) => ({
              ...left,
              coronaNotiLeft: _width + 880,
            }));
            setWidth((width) => ({
              ...width,
              coronaNotiWidth: 600 - _width,
              dailyWidth: _width,
            }));
          }
          if (data.handle === "se") {
            setTop((top) => ({
              ...top,
              workCheckTop: _height + 90,
              serviceCenterTop: _height + 90,
            }));
            setLeft((left) => ({
              ...left,
              serviceCenterLeft: _width + 880,
              coronaNotiLeft: _width + 880,
            }));
            setWidth((width) => ({
              ...width,
              serviceCenterWidth: 600 - _width,
              coronaNotiWidth: 600 - _width,
              workCheckWidth: _width,
              dailyWidth: _width,
            }));
            setHeight((height) => ({
              ...height,
              serviceCenterHeight: 645 - _height,
              workCheckHeight: 645 - _height,
              coronaNotiHeight: _height,
              dailyHeight: _height,
            }));
          }
        }}
        className={`card card__daily ${useLayout === 2 ? "drag-active" : ""}`}
      >
        <div className="card__daily-title">유치원 일정</div>
        <SizedBox height="30px" />
        <RC>
          <div className="card__daily_item_date-1">1월 24일 (월)</div>
          <SizedBox width="50px" />
          <Column>
            <div className="card__daily_item_list-1-1">현장체험학습</div>
          </Column>
        </RC>
        {seperator("15px")}
        <RC>
          <div className="card__daily_item_date-2">1월 25일 (화)</div>
          <SizedBox width="50px" />
          <Column>
            <div className="card__daily_item_list-2-1">케틀벨 연주 연습</div>
            <div className="card__daily_item_list-2-2">15~17시 소방 점검</div>
          </Column>
        </RC>
        {seperator("15px")}
        <RC>
          <div className="card__daily_item_date-3">1월 26일 (수)</div>
          <SizedBox width="50px" />
          <Column>
            <div className="card__daily_item_list-3-1">샌드놀이</div>
            <div className="card__daily_item_list-3-2">학예회(오후)</div>
          </Column>
        </RC>
        {seperator("15px")}
        <RC>
          <div className="card__daily_item_date-4">1월 27일 (목)</div>
          <SizedBox width="50px" />
          <Column>
            <div className="card__daily_item_list-4-1">장학사 방문</div>
            <div className="card__daily_item_list-4-2">교구 전시회</div>
          </Column>
        </RC>
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          top: `${top.workCheckTop}px`,
          left: `${left.workCheckLeft}px`,
        }}
        resizeHandles={["e"]}
        width={width.workCheckWidth}
        height={height.workCheckHeight}
        maxConstraints={[
          inRange(
            height.dailyHeight,
            height.coronaNotiHeight - 15,
            height.coronaNotiHeight + 15
          ) ||
          inRange(
            height.coronaNotiHeight,
            height.dailyHeight - 15,
            height.dailyHeight + 15
          )
            ? Infinity
            : width.dailyWidth,
          Infinity,
        ]}
        minConstraints={[
          inRange(
            height.dailyHeight,
            height.coronaNotiHeight - 15,
            height.coronaNotiHeight + 15
          ) ||
          inRange(
            height.coronaNotiHeight,
            height.dailyHeight - 15,
            height.dailyHeight + 15
          )
            ? 0
            : width.dailyWidth,
          0,
        ]}
        onResize={(e, data) => {
          const _width = data.size.width;
          if (data.handle === "e") {
            setLeft((left) => ({
              ...left,
              serviceCenterLeft: _width + 880,
            }));
            setWidth((width) => ({
              ...width,
              serviceCenterWidth: 600 - _width,
              workCheckWidth: _width,
            }));
          }
        }}
        className={`card card__work_check ${
          useLayout === 2 ? "drag-active" : ""
        }`}
      >
        <div className="card__work_check-title">근무상황체크</div>
        <SizedBox height="16px" />
        <Column>
          <Row
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="card__work_check_item_title-1">중식 메뉴 변경</div>
            <div className="card__work_check_item_time-1">7시간 전</div>
          </Row>
          <div className="card__work_check_item_content-1">
            급식 안내에 업데이트 바랍니다.
          </div>
        </Column>
        {seperator("15px")}
        <Column>
          <Row
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="card__work_check_item_title-2">일정 변경 안내</div>
            <div className="card__work_check_item_time-2">8시간 전</div>
          </Row>

          <div className="card__work_check_item_content-2">
            금일 15시 CCTV 및 소방점검 예정되오니 야외 학습...
          </div>
        </Column>
        {seperator("15px")}
        <Column>
          <Row
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="card__work_check_item_title-3">근무 일정 안내</div>
            <div className="card__work_check_item_time-3">어제</div>
          </Row>

          <div className="card__work_check_item_content-3">
            7월 당직표를 다음과 같이 공지합니다.
          </div>
        </Column>
        {seperator("15px")}
        <Column>
          <Row
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="card__work_check_item_title-4">
              프로그램 사용 안내
            </div>
            <div className="card__work_check_item_time-4">어제</div>
          </Row>

          <div className="card__work_check_item_content-4">
            딩고 프로그램 사용방법을 안내합니다.
          </div>
        </Column>
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          top: `${top.coronaNotiTop}px`,
          left: `${left.coronaNotiLeft}px`,
        }}
        width={width.coronaNotiWidth}
        height={height.coronaNotiHeight}
        resizeHandles={["s"]}
        minConstraints={[
          0,
          inRange(
            width.workCheckWidth,
            width.dailyWidth - 15,
            width.dailyWidth + 15
          ) ||
          inRange(
            width.dailyWidth,
            width.workCheckWidth - 15,
            width.workCheckWidth + 15
          )
            ? 0
            : width.dailyWidth,
        ]}
        maxConstraints={[
          Infinity,
          inRange(
            width.workCheckWidth,
            width.dailyWidth - 15,
            width.dailyWidth + 15
          ) ||
          inRange(
            width.dailyWidth,
            width.workCheckWidth - 15,
            width.workCheckWidth + 15
          )
            ? Infinity
            : width.dailyWidth,
        ]}
        onResize={(e, data) => {
          const _height = data.size.height;
          if (data.handle === "s") {
            setTop((top) => ({
              ...top,
              serviceCenterTop: _height + 90,
            }));
            setHeight((height) => ({
              ...height,
              serviceCenterHeight: 645 - _height,
              coronaNotiHeight: _height,
            }));
          }
        }}
        className={`card card__corona ${useLayout === 2 ? "drag-active" : ""}`}
      >
        <Row
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="card__corona-title">코로나 지침 현황</div>
          <div
            className="card__corona_noti-title-more"
            onClick={() => {
              const { BrowserWindow, ipcMain } =
                window.require("@electron/remote");
              let win = new BrowserWindow({
                width: 1450,
                height: 800,
                resizable: false,
                webPreferences: {
                  contextIsolation: false,
                  nodeIntegration: true,
                  enableRemoteModule: true,
                },
              });
              window
                .require("@electron/remote")
                .require("@electron/remote/main")
                .enable(win.webContents);
              ipcMain.once("open", (event, arg) => {
                event.sender.send("on-data", corona);
              });
              // win.webContents.openDevTools();
<<<<<<< HEAD
              // dev
              win.loadURL("http://localhost:3000/#/coronapost");
              // production
              // win.loadFile("build/index.html", { hash: "#/coronapost" });
=======
              if(isDev) {
                win.loadURL("http://localhost:3000/#/coronapost");
              } else {
                win.loadFile("build/index.html", {
                hash: "#/coronapost",
              });
              }
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
            }}
          >
            더 보기
          </div>
        </Row>
        <div
          style={{
            paddingTop: "16px",
          }}
        />
        {coronaNf.map((coronaN, index) => {
          return (
            <div>
              <Column>
                <Row
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <div className={`card__gov_noti_item_title-${index + 1}`}>
                    {coronaN["제목"].substring(0, 15)}...
                  </div>
                  <div
                    style={{
                      position: "relative",
                      top: "-5px",
                    }}
                    className={`card__gov_noti_item_time-${index + 1}`}
                  >
                    {coronaN["작성일"].split(" ")[0]}
                  </div>
                </Row>
                <div className={`card__gov_noti_item_content-${index + 1}`}>
                  {plainString(coronaN["본문내용"]).substring(0, 30)}...
                </div>
              </Column>
              {index < coronaNf.length - 1 ? seperator("15px") : <div />}
            </div>
          );
        })}
      </ResizableBox>
      <ResizableBox
        handle={dummyHandle(useLayout !== 1)}
        draggableOpts={{
          grid: [10, 10],
        }}
        style={{
          top: `${top.serviceCenterTop}px`,
          left: `${left.serviceCenterLeft}px`,
        }}
        width={width.serviceCenterWidth}
        height={height.serviceCenterHeight}
        className={`card card__service_center ${
          useLayout === 2 ? "drag-active" : ""
        }`}
      >
        <div className="card__service_center-title">우리 원 미세먼지</div>
        <SizedBox height="16px" />
        <Chart options={option} series={series} height={"280"} />
      </ResizableBox>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    useLayout: state.misc.useLayout,
  };
};

export default connect(mapStateToProps, {
  getGovNoti,
  getCoronaNoti,
  getPm,
})(DashBoard);
