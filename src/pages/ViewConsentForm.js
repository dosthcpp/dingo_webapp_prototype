import React, { useEffect, useState } from "react";
import { Column, Row, RowCentered, SizedBox } from "../layout";

const ipcRenderer = window.require("electron").ipcRenderer;

const ViewConsentForm = () => {
  const toDateString = (d) => {
    const _d = new Date(d);
    return `${_d.getFullYear()}년 ${_d.getMonth() + 1}월 ${_d.getDate()}일`;
  };

  const [args, setArgs] = useState({});
  useEffect(() => {
    ipcRenderer.send("variable-request");
    ipcRenderer.on("variable-reply", (evt, args) => {
      setArgs({
        c: args[0],
        name: args[1],
      });
    });
  }, []);

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <SizedBox height="50px" />
      <RowCentered
        style={{
          justifyContent: "space-around",
        }}
      >
        <span>반 이름: 희망반</span>
        <span>영유아명: {args?.name}</span>
        <span>원아 성별: 남</span>
      </RowCentered>
      <SizedBox height="15px" />
      <div>제목: {args?.c?.contents}</div>
      <SizedBox height="15px" />
      <div
        dangerouslySetInnerHTML={{
          __html: args?.c?.subcontents,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 100,
        }}
      >
        <RowCentered>
          {toDateString(args?.c?.createdAt?.seconds * 1000)}
        </RowCentered>
        <SizedBox height="50px" />
        <Row
          style={{
            justifyContent: "end",
          }}
        >
          <Column>
            <div>보호자 성명: 김현수</div>
            <div>h.p: 01011112222</div>
            <div>영유아와의 관계: 아버지</div>
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default ViewConsentForm;
