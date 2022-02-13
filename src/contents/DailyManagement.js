import React, { useState } from "react";
import { firestore } from "../firebase";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Calendar from "react-calendar";
import { SizedBox } from "../layout";
import { NotificationManager } from "react-notifications";

const DailyManagement = () => {
  const [display, setDisplay] = useState("none");
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));
  const [input, setInput] = useState("");
  const [dailyArr, setDailyArr] = useState([]);

  const toDateString = (d) => {
    const _d = new Date(d);
    return `${_d.getFullYear()}년 ${_d.getMonth() + 1}월 ${_d.getDate()}일`;
  };

  const uploadDaily = async () => {
    try {
      const docs = (await firestore.collection("daily").get()).docs;
      var i = 0;
      for (; i < docs.length; ++i) {
        const date =
          (await firestore.collection("daily").doc(docs[i].id).get()).data()[
            "date"
          ] ?? new Date(Date.now());
        const d = new Date(date.toDate());
        const d2 = selectedDay;
        d.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        if (d2.getTime() === d.getTime()) break;
      }
      if (i < docs.length) {
        NotificationManager.error("이미 일정이 업로드 된 날짜입니다.");
      } else {
        firestore.collection("daily").add({
          date: selectedDay,
          content: dailyArr,
        });
        setDailyArr([]);
        NotificationManager.info("일정이 성공적으로 업로드되었습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="daily_management">
      <div className="select_box">
        <li className="menu-items item-1 submenu-wpr">
          <span
            onClick={() => {
              setDisplay("block");
            }}
          >
            {toDateString(selectedDay)}
          </span>
          <div
            className="submenu__content"
            style={{
              display,
            }}
          >
            <Calendar
              defaultValue={new Date(Date.now())}
              className="daily_management-calendar"
              onClickDay={(d) => {
                const _date = new Date(d);
                setSelectedDay(_date);
                setDisplay("none");
              }}
            />
          </div>
        </li>
      </div>
      <SizedBox height="20px" />
      {dailyArr.map((daily) => {
        return <div>{`\u2022${daily}`}</div>;
      })}
      <SizedBox height="20px" />
      <div>
        <span>
          <input
            value={input}
            className="daily_management__input-daily"
            placeholder="일정을 입력하세요."
            type="text"
            name="title"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </span>
        <span>
          <button
            onClick={() => {
              if (input !== "") {
                setDailyArr((daily) => [...daily, input]);
                setInput("");
              }
            }}
            className="plus-button plus-button--small"
          ></button>
        </span>
      </div>
      <SizedBox height="20px" />

      <input
        type="button"
        className="daily_management__submit-btn"
        value="전송"
        onClick={uploadDaily}
      />
    </div>
  );
};

export default DailyManagement;
