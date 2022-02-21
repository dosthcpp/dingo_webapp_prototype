import 동의서 from "../icons/동의서.png";

import React, { useEffect, useState } from "react";
import { Column, SizedBox } from "../layout";
import { fetchChildList } from "../actions";
import Calendar from "react-calendar";
import { firestore } from "../firebase";
import { parseDateForFirebaseWithoutTime } from "../utils";
import { NotificationManager } from "react-notifications";
<<<<<<< HEAD
import { connect } from "react-redux";
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329

const Attendance = ({ fetchedChildList, fetchChildList }) => {
  const [selected, setSelected] = useState(0);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));
  const [selectedStatus, setSelectedStatus] = useState({
    value: "결석",
    name: "결석",
  });
  const kindgartenList = ["새싹반", "햇님반", "달님반"];
<<<<<<< HEAD
=======
  const childList = ["백도연", "테테테", "박부박"];
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
  const options = [
    { value: "출석", name: "출석" },
    { value: "결석", name: "결석" },
  ];

<<<<<<< HEAD
  useEffect(() => {
    fetchChildList();
  }, [fetchChildList]);

=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
  const dateDisplay = (_date) => {
    return `${_date.getFullYear()}년 ${
      _date.getMonth() + 1
    }월 ${_date.getDate()}일`;
  };

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

  const renderChildList = () => {
    return fetchedChildList.map((cur, idx) => {
      return (
        <div className={"attendance__parent-list-item"}>
          <div className={"attendance__parent-list-item-name"}>
            {cur["원아 이름"]}
          </div>
          <button
            className={`attendance__parent-list-item-button-${idx}`}
            style={{
              border:
                selectedChild === idx
                  ? "1.5px solid CornflowerBlue"
                  : "1.5px solid black",
              boxShadow:
                selectedChild === idx
                  ? "0.5px 1px 5px CornflowerBlue"
                  : "0.5px 1px 5px gray",
              color: selectedChild === idx ? "CornflowerBlue" : "gray",
            }}
            onClick={() => {
              setSelectedChild(idx);
              setSelectedName(cur["원아 이름"]);
            }}
          >
            확인하기
          </button>
        </div>
      );
    });
  };

  const renderSwitch = () => {
    switch (selected) {
      case 0:
        return renderChildList();
      default:
        break;
    }
  };

  return (
    <div className="attendance">
      <div className="attendance-div-1">
        <img
          className="attendance__image"
          src={동의서}
          alt="content"
          style={{ width: "2.8rem" }}
        />
        <div className="attendance__title">출석부 관리</div>
      </div>
      <div className="attendance-div-2">{renderMenu()}</div>
      <div className="attendance-div-3">
        <div className="attendance__parent-list-title fixed">원아 목록</div>
        <div className="attendance__parent-list-items">{renderSwitch()}</div>
      </div>
      <div className="attendance-div-4">
        <div className="attendance-div-4__header">
          {selectedChild !== null ? (
            <Column>
              <div className="attendance-div-4__title">{selectedName}</div>
              <div className="attendance-div-4__subtitle">출석 상태</div>
            </Column>
          ) : null}
        </div>
        <div className="attendance-div-4__items">
          <div className="attendance-calendar-container">
            {selectedName ? (
              <Calendar
                defaultValue={new Date(Date.now())}
                className="attendance-calendar"
                onClickDay={(d) => {
                  const _date = new Date(d);
                  setSelectedDay(_date);
                }}
              />
            ) : null}
            <SizedBox height="1rem" />
            {selectedName ? (
              <div className="attendance-calendar-status">
                <div>
                  <span>
                    {`${selectedName} 원아의 ${dateDisplay(
                      selectedDay
                    )} 출석상태: `}
                  </span>
                  <select
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                    }}
                    defaultValue="결석"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const status = selectedStatus === "출석" ? true : false;
                      const snap = await firestore
                        .collection("attendance")
                        .get();
                      let i = 0;
                      const _len = snap.docs.length;
                      for (
                        ;
                        i < _len &&
                        !(
                          snap.docs[i].data()["원아 이름"] === selectedName &&
                          parseDateForFirebaseWithoutTime(
                            snap.docs[i].data()["날짜"].toDate()
                          ) === parseDateForFirebaseWithoutTime(selectedDay)
                        );
                        ++i
                      ) {}
                      if (i >= _len) {
<<<<<<< HEAD
                        await firestore.collection("attendance").add({
=======
                        firestore.collection("attendance").add({
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
                          "원아 이름": selectedName,
                          출석: status,
                          날짜: selectedDay,
                          isNotified: false,
                        });
                        NotificationManager.info(
                          "원아의 출결상태가 정상적으로 저장되었습니다."
                        );
                      } else {
                        if (snap.docs[i].data()["출석"] !== status) {
                          firestore
                            .collection("attendance")
                            .doc(snap.docs[i].id)
                            .update({
                              출석: status,
                              isNotified: false,
                            });
                          NotificationManager.info(
                            "원아의 출결상태가 정상적으로 저장되었습니다."
                          );
                        } else {
                          NotificationManager.error(
                            "이미 처리된 출결상태입니다."
                          );
                        }
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  저장하기
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedChildList: state.fetch.childList,
  };
};

export default connect(mapStateToProps, {
  fetchChildList,
})(Attendance);
