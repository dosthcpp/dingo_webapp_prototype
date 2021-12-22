import 동의서 from "../icons/동의서.png";

import React, { useState } from "react";
import { Column, SizedBox } from "../layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Attendance = () => {
  const [selected, setSelected] = useState(0);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDay, setSelectedDay] = useState(`1월 1일`);
  const kindgartenList = ["새싹반", "햇님반", "달님반"];
  const childList = ["백도연", "테테테", "박부박"];

  const renderMenu = () => {
    return kindgartenList.map((key, idx) => {
      return (
        <button
          className={`classname classname-${idx}`}
          style={{
            backgroundColor: selected === idx ? "CornflowerBlue" : "#f8f9fa",
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
    return childList.map((name, idx) => {
      return (
        <div className={"attendance__parent-list-item"}>
          <div className={"attendance__parent-list-item-name"}>{name}</div>
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
              setSelectedName(name);
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
                className="attendance-calendar"
                onClickDay={(d) => {
                  const _date = new Date(d);
                  const dayString = `${
                    _date.getMonth() + 1
                  }월 ${_date.getDate()}일`;
                  setSelectedDay(dayString);
                }}
              />
            ) : null}
            <SizedBox height="1rem" />
            {selectedName ? (
              <div className="attendance-calendar-status">
                <span>
                  {`${selectedName} 원아의 ${selectedDay} 출석상태: `}
                </span>
                <span
                  style={{
                    color: "green",
                  }}
                >
                  출석
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
