import React, { useRef, useState } from "react";
import icon from "../icons/icon.png";
import chatbot from "../icons/chatbot.png";
import {
  Row,
  RowNormal,
  RowCentered,
  Column,
  ColumnWithWidth,
  MessageBubbleColumn,
  MessageBubbleContainer,
} from "../layout";

const DashBoard = () => {
  const today = new Date(Date.now());
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const thedayaftertomorrow = new Date();
  thedayaftertomorrow.setDate(today.getDate() + 2);
  const [message, setMessage] = useState("");
  const [messageBubbles, setMessageBubbles] = useState([
    <MessageBubbleContainer>
      <img
        src={chatbot}
        alt={"chatbot-icon"}
        style={{ width: "2rem", marginRight: "5px" }}
      />
      <div className="card__service_center-message_bubble-chatbot">
        <div className="card__service_center-message_bubble-chatbot-tip"></div>
        프로그램 사용에 어려움이 있으신가요?
      </div>
    </MessageBubbleContainer>,
  ]);

  return (
    <div className="dashboard">
      <RowNormal>
        <Column>
          <Row>
            <div className="card card-email">
              <div className="card__email_section-main-title">중요 알림</div>
              <hr className="solid" />
              <Row>
                <div className="vl"></div>
                <Column>
                  <Row>
                    <div className="card__email_title-1">
                      [알림] 딩고 서버 점검 안내
                    </div>
                    <div className="card__email_time-1">7시간 전</div>
                  </Row>
                  <div className="card__email_sender-1">딩고 운영팀</div>
                  <div className="card__email_content-1">
                    금일 09시부터 12시까지 서버 점검으로 인하여...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__email_title-2">출석부 제출 안내</div>
                    <div className="card__email_time-2">8시간 전</div>
                  </Row>
                  <div className="card__email_sender-2">원감 선생님</div>
                  <div className="card__email_content-2">
                    각 반 평가제 대비 원아 출석부 기한내 제출 바랍...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
            </div>
            <div className="card card-shift_noti">
              <div className="card__shift_noti_section-main-title">
                당직 알림
              </div>
              <hr className="solid" />
              <RowCentered>
                <ColumnWithWidth>
                  <div className="card__shift_noti_day-1">
                    {`${today.getFullYear()}년 ${
                      today.getMonth() + 1
                    }월 ${today.getDate()}일`}
                  </div>
                  <div className="card__shift_noti_self-1">•이시우 선생님</div>
                  <div className="card__shift_noti_self-1">•김연지 선생님</div>
                </ColumnWithWidth>
                <div className="vl-normal-noti"></div>
                <ColumnWithWidth>
                  <div className="card__shift_noti_day-2">
                    {`${tomorrow.getFullYear()}년 ${
                      tomorrow.getMonth() + 1
                    }월 ${tomorrow.getDate()}일`}
                  </div>
                  <div className="card__shift_noti_self-2">•박희연 선생님</div>
                  <div className="card__shift_noti_self-2">•조수민 선생님</div>
                </ColumnWithWidth>
                <div className="vl-normal-noti"></div>
                <ColumnWithWidth>
                  <div className="card__shift_noti_day-3">
                    {`${thedayaftertomorrow.getFullYear()}년 ${
                      thedayaftertomorrow.getMonth() + 1
                    }월 ${thedayaftertomorrow.getDate()}일`}
                  </div>
                  <div className="card__shift_noti_self-3">•이시우 선생님</div>
                  <div className="card__shift_noti_self-3">•백도연 선생님</div>
                </ColumnWithWidth>
              </RowCentered>
            </div>
          </Row>
          <Row>
            <div className="card card-kind_noti">
              <div className="card__kind_noti-main-title">유치원 공지 알림</div>
              <hr className="solid" />
              <Row>
                <div className="vl"></div>
                <Column>
                  <Row>
                    <div className="card__kind_noti_title-1">원아 모집</div>
                    <div className="card__kind_noti_time-1">7시간 전</div>
                  </Row>
                  <div className="card__kind_noti_sender-1">원감 선생님</div>
                  <div className="card__kind_noti_content-1">
                    우리 아이를 위한 행복한 유치원 선택, '처음학교로'...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__kind_noti_title-2">
                      2021학년도 새싹유치원 원아모집 요강
                    </div>
                    <div className="card__kind_noti_time-2">14시간 전</div>
                  </Row>
                  <div className="card__kind_noti_sender-2">원감 선생님</div>
                  <div className="card__kind_noti_content-2">
                    2021학년도 새싹유치원 유아 우선, 일반요집 요강을...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl"></div>
                <Column>
                  <Row>
                    <div className="card__kind_noti_title-3">
                      2021학년도 제 1회 1기 새싹유치원운영위원...
                    </div>
                    <div className="card__kind_noti_time-3">어제</div>
                  </Row>
                  <div className="card__kind_noti_sender-3">원감 선생님</div>
                  <div className="card__kind_noti_content-3">
                    2021학년도 제 2회 1기 새싹유치원운영위원회를...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__kind_noti_title-4">학사일정 안내</div>
                    <div className="card__kind_noti_time-4">2021.06.16</div>
                  </Row>
                  <div className="card__kind_noti_sender-4">원감 선생님</div>
                  <div className="card__kind_noti_content-4">
                    코로나바이러스감염증-19로 인하여 교육부는...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__kind_noti_title-5">
                      어린이 인플루엔자 무료예방접종 안내
                    </div>
                    <div className="card__kind_noti_time-5">2021.06.15</div>
                  </Row>
                  <div className="card__kind_noti_sender-5">원감 선생님</div>
                  <div className="card__kind_noti_content-5">
                    인플루엔자 무료예방접종 관련하여 다음과 같이 공지...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__kind_noti_title-6">
                      2021년 가족축제 취소 알림
                    </div>
                    <div className="card__kind_noti_time-6">2021.06.15</div>
                  </Row>
                  <div className="card__kind_noti_sender-6">원감 선생님</div>
                  <div className="card__kind_noti_content-6">
                    코로나바이러스로 인하여 2021년 예정이었던 가족축제를...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
            </div>
            <div className="card card-gov_noti">
              <div className="card__gov_noti-main-title">정부 공문 알림</div>
              <hr className="solid" />
              <Row>
                <div className="vl"></div>
                <Column>
                  <Row>
                    <div className="card__gov_noti_title-1">
                      재외동포 어린이 한국어 그림일기대회
                    </div>
                    <div className="card__gov_noti_time-1">5시간 전</div>
                  </Row>
                  <div className="card__gov_noti_sender-1">교육부</div>
                  <div className="card__gov_noti_content-1">
                    [교육부 공고 제 2021-209호] 재외동포 어린이 한국어...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl"></div>
                <Column>
                  <Row>
                    <div className="card__gov_noti_title-2">
                      2021학년도 교류지원사업 참가 안내
                    </div>
                    <div className="card__gov_noti_time-2">13시간 전</div>
                  </Row>
                  <div className="card__gov_noti_sender-2">교육부</div>
                  <div className="card__gov_noti_content-2">
                    [교육부 공고 제 2021-208호] 2021학년도 교류지원사업...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__gov_noti_title-3">
                      유치원 교육과정 일부개정(안) 공청회 개최
                    </div>
                    <div className="card__gov_noti_time-3">2021.06.16</div>
                  </Row>
                  <div className="card__gov_noti_sender-3">교육부</div>
                  <div className="card__gov_noti_content-3">
                    유치원 교육과정 일부개정(안) 공청회 개최를 다음과 같이...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__gov_noti_title-4">
                      유치원 방과후 특성화 프로그램 추천제 안내
                    </div>
                    <div className="card__gov_noti_time-4">2021.06.14</div>
                  </Row>
                  <div className="card__gov_noti_sender-4">교육부</div>
                  <div className="card__gov_noti_content-4">
                    유치원 방과후 특성화 프로그램 추천제를 다음과 같이...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__gov_noti_title-5">
                      사립유치원 재무회계 규칙 제정안 공청회...
                    </div>
                    <div className="card__gov_noti_time-5">2021.06.13</div>
                  </Row>
                  <div className="card__gov_noti_sender-5">교육부</div>
                  <div className="card__gov_noti_content-5">
                    사립유치원 재무회계 규칙 제정안 공청회를 다음과...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
              <Row>
                <div className="vl_invisible"></div>
                <Column>
                  <Row>
                    <div className="card__gov_noti_title-6">
                      유치원 홍보 UCC 공모 심사 결과 발표
                    </div>
                    <div className="card__gov_noti_time-6">2021.06.12</div>
                  </Row>
                  <div className="card__gov_noti_sender-6">교육부</div>
                  <div className="card__gov_noti_content-6">
                    유치원 홍보 UCC 공모 심사 결과 안내...
                  </div>
                </Column>
              </Row>
              <hr className="solid" />
            </div>
          </Row>
        </Column>
        <Column>
          <RowNormal>
            <Column>
              <div className="card card-daily">
                <div className="card__daily-main-title">유치원 일정</div>
                <hr className="solid" />
                <RowCentered>
                  <div className="card__daily-date-1">17(월)</div>
                  <div className="vl-normal"></div>
                  <Column>
                    <div>•현장체험학습</div>
                  </Column>
                </RowCentered>
                <hr className="solid" />
                <RowCentered>
                  <div className="card__daily-date-2">18(화)</div>
                  <div className="vl-normal"></div>
                  <Column>
                    <div>•케틀벨 연주 연습</div>
                    <div>•15~17시 소방 점검</div>
                  </Column>
                </RowCentered>
                <hr className="solid" />
                <RowCentered>
                  <div className="card__daily-date-3">19(수)</div>
                  <div className="vl-normal"></div>
                  <Column>
                    <div>•샌드놀이</div>
                    <div>•학예회(오후)</div>
                  </Column>
                </RowCentered>
                <hr className="solid" />
                <RowCentered>
                  <div className="card__daily-date-4">20(목)</div>
                  <div className="vl-normal"></div>
                  <Column>
                    <div>•장학사 방문</div>
                    <div>•교구 전시회</div>
                  </Column>
                </RowCentered>
                <hr className="solid" />
              </div>
            </Column>
            <Column>
              <div className="card card-corona">
                <div className="card__corona-main-title">코로나 지침 현황</div>
                <hr className="solid" />
                <Row>
                  <div className="vl"></div>
                  <Column>
                    <Row>
                      <div className="card__corona_title-1">
                        코로나바이러스감염증-19 대응 지침
                      </div>
                      <div className="card__corona_time-1">3시간 전</div>
                    </Row>
                    <div className="card__corona_sender-1">
                      중앙방역대책본부
                    </div>
                    <div className="card__corona_content-1">
                      코로나바이러스감염증-19 대응 지침을 다음과 같이 공유...
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
                <Row>
                  <div className="vl_invisible"></div>
                  <Column>
                    <Row>
                      <div className="card__corona_title-2">
                        코로나바이러스감염증-19 대응 지침
                      </div>
                      <div className="card__corona_time-2">4시간 전</div>
                    </Row>
                    <div className="card__corona_sender-2">
                      중앙방역대책본부
                    </div>
                    <div className="card__corona_content-2">
                      코로나바이러스감염증-19 대응 지침을 다음과 같이 공유...
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
                <Row>
                  <div className="vl_invisible"></div>
                  <Column>
                    <Row>
                      <div className="card__corona_title-3">
                        코로나바이러스감염증-19 대응 지침
                      </div>
                      <div className="card__corona_time-3">5시간 전</div>
                    </Row>
                    <div className="card__corona_sender-3">
                      중앙방역대책본부
                    </div>
                    <div className="card__corona_content-3">
                      코로나바이러스감염증-19 대응 지침을 다음과 같이 공유...
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
                <Row>
                  <div className="vl_invisible"></div>
                  <Column>
                    <Row>
                      <div className="card__corona_title-4">
                        코로나바이러스감염증-19 대응 지침
                      </div>
                      <div className="card__corona_time-4">6시간 전</div>
                    </Row>
                    <div className="card__corona_sender-4">
                      중앙방역대책본부
                    </div>
                    <div className="card__corona_content-4">
                      코로나바이러스감염증-19 대응 지침을 다음과 같이 공유...
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
              </div>
            </Column>
          </RowNormal>
          <RowNormal>
            <Column>
              <div className="card card-work_check">
                <div className="card__work_check-title-1">근무상황체크</div>
                <hr className="solid" />
                <Row>
                  <div className="vl"></div>
                  <Column>
                    <Row>
                      <div className="card__work_check_title-1">
                        중식 메뉴 변경
                      </div>
                      <div className="card__work_check_time-1">7시간 전</div>
                    </Row>
                    <div className="card__work_check_sender-1">
                      박정우 영양사님
                    </div>
                    <div className="card__work_check_content-1">
                      급식 안내에 업데이트 바랍니다.
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
                <Row>
                  <div className="vl_invisible"></div>
                  <Column>
                    <Row>
                      <div className="card__work_check_title-2">
                        일정 변경 안내
                      </div>
                      <div className="card__work_check_time-2">8시간 전</div>
                    </Row>
                    <div className="card__work_check_sender-2">원감 선생님</div>
                    <div className="card__work_check_content-2">
                      금일 15시 CCTV 및 소방점검 예정되오니 야외 학습...
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
                <Row>
                  <div className="vl"></div>
                  <Column>
                    <Row>
                      <div className="card__work_check_title-3">
                        근무 일정 안내
                      </div>
                      <div className="card__work_check_time-3">어제</div>
                    </Row>
                    <div className="card__work_check_sender-3">원감 선생님</div>
                    <div className="card__work_check_content-3">
                      7월 당직표를 다음과 같이 공지합니다.
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
                <Row>
                  <div className="vl_invisible"></div>
                  <Column>
                    <Row>
                      <div className="card__work_check_title-4">
                        프로그램 사용 안내
                      </div>
                      <div className="card__work_check_time-4">어제</div>
                    </Row>
                    <div className="card__work_check_sender-4">원감 선생님</div>
                    <div className="card__work_check_content-4">
                      딩고 프로그램 사용방법을 안내합니다.
                    </div>
                  </Column>
                </Row>
                <hr className="solid" />
              </div>
            </Column>
            <Column>
              <div className="card card-service_center">
                <div className="card__service_center-title-1">고객센터</div>
                <hr className="solid" />
                <MessageBubbleColumn
                  style={{
                    overflowY: "scroll",
                  }}
                >
                  {messageBubbles}
                </MessageBubbleColumn>
                <hr className="solid" />
                <input
                  placeholder="채팅을 입력하세요..."
                  type="text"
                  name="name"
                  style={{
                    width: "300px",
                    outline: "none",
                  }}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setMessageBubbles((old) => [
                        ...old,
                        <MessageBubbleContainer
                          style={{
                            justifyContent: "flex-end",
                          }}
                        >
                          <div className="card__service_center-message_bubble-me">
                            <div className="card__service_center-message_bubble-me-tip"></div>
                            {message}
                          </div>
                          <img
                            src={icon}
                            alt={"chatbot-icon"}
                            style={{ width: "2rem", marginLeft: "5px" }}
                          />
                        </MessageBubbleContainer>,
                        <MessageBubbleContainer>
                          <img
                            src={chatbot}
                            alt={"chatbot-icon"}
                            style={{ width: "2rem", marginRight: "5px" }}
                          />
                          <div className="card__service_center-message_bubble-chatbot">
                            <div className="card__service_center-message_bubble-chatbot-tip"></div>
                            (월,화,수,목,금) (10:00~17:30, 점심시간(12:00~13:00)
                            제외) 에만 채팅이 가능합니다. 입력하신 메시지는
                            전달되었으니 채팅이 가능한 시간에 답변 드리겠습니다.
                          </div>
                        </MessageBubbleContainer>,
                      ]);
                      setMessage("");
                    }
                  }}
                />
              </div>
            </Column>
          </RowNormal>
        </Column>
      </RowNormal>
    </div>
  );
};

export default DashBoard;
