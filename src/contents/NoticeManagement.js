import React, { useState } from "react";
import { firestore } from "../firebase";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Column, RowCentered } from "../layout";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-calendar/dist/Calendar.css";

const NoticeManagement = () => {
  const [type, setType] = useState("가정통신문");
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const uploadNotice = async () => {
    try {
      const editorToHtml = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      const snapshots = (await firestore.collection("user").get()).docs;
      for (var i = 0; i < snapshots.length; ++i) {
        const agreementList =
          (
            await firestore.collection("user").doc(snapshots[i].id).get()
          ).data()["알림장"] ?? [];
        firestore
          .collection("user")
          .doc(snapshots[i].id)
          .update({
            알림장: [
              ...agreementList,
              {
                title,
                contents: editorToHtml,
                createdAt: new Date(),
              },
            ],
          });
      }
      setEditorState(EditorState.createEmpty());
      setTitle("");
      NotificationManager.info("알림장이 성공적으로 업로드되었습니다.");
    } catch (e) {
      console.log(e);
    }
  };

  const uploadNoticeForParent = async () => {
    try {
      const editorToHtml = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      const snapshots = (await firestore.collection("user").get()).docs;
      for (var i = 0; i < snapshots.length; ++i) {
        const agreementList =
          (
            await firestore.collection("user").doc(snapshots[i].id).get()
          ).data()["가정통신문"] ?? [];
        firestore
          .collection("user")
          .doc(snapshots[i].id)
          .update({
            가정통신문: [
              ...agreementList,
              {
                title,
                contents: editorToHtml,
                createdAt: new Date(),
              },
            ],
          });
      }
      setEditorState(EditorState.createEmpty());
      setTitle("");
      NotificationManager.info("가정통신문이 성공적으로 업로드되었습니다.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <NotificationContainer />
      <select
        onChange={(e) => {
          setType(e.target.value);
          console.log(type);
        }}
      >
        <option value="알림장">알림장</option>
        <option value="가정통신문" selected>
          가정통신문
        </option>
      </select>
      <RowCentered>
        <label>{`${type} 제목`}</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </RowCentered>
      <Column>
        <label>{`${type} 세부 내용`}</label>
        <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor"
          toolbarClassName="toolbar-class"
          toolbar={{
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }}
          placeholder="내용을 작성해주세요."
          localization={{
            locale: "ko",
          }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </Column>
      {type === "알림장" ? (
        <input type="button" value="전송" onClick={uploadNotice} />
      ) : (
        <input type="button" value="전송" onClick={uploadNoticeForParent} />
      )}
    </div>
  );
};

export default NoticeManagement;
