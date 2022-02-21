import React, { useState } from "react";
import { firestore } from "../firebase";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { SizedBox } from "../layout";
import { NotificationManager } from "react-notifications";
import Select from "react-select";

const NoticeManagement = () => {
  const [type, setType] = useState("알림장");
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const options = [
    { value: "알림장", label: "알림장" },
    { value: "가정통신문", label: "가정통신문" },
  ];

  const uploadNotice = async () => {
    try {
      const editorToHtml = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      const docs = (
        await firestore
          .collection("user")
          .where("userType", "==", "학부모")
          .get()
      ).docs;
      for (let i = 0; i < docs.length; ++i) {
        console.log(docs[i].id);
        const agreementList =
          (await firestore.collection("user").doc(docs[i].id).get()).data()[
            "알림장"
          ] ?? [];
        console.log(agreementList);
        firestore
          .collection("user")
          .doc(docs[i].id)
          .update({
            알림장: [
              ...agreementList,
              {
                title,
                contents: editorToHtml,
                createdAt: new Date(Date.now()),
              },
            ],
            lastUpdate: {
              updated: "알림장",
              time: new Date(Date.now()),
            },
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
      const snapshots = (
        await firestore
          .collection("user")
          .where("userType", "==", "학부모")
          .get()
      ).docs;
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
                createdAt: new Date(Date.now()),
              },
            ],
            lastUpdate: {
              updated: "가정통신문",
              time: new Date(Date.now()),
            },
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
    <div className="notice_management">
      <div className="select_box">
        <Select
          classNamePrefix="select_box"
          inputId="select_box__options"
          isSearchable={false}
          options={options}
          defaultValue={options[0]}
          onChange={(e) => {
            setType(e.value);
            console.log(type);
          }}
          className="select"
        ></Select>
      </div>
      <SizedBox height="30px" />
      <input
        className="notice_management__input-title"
        placeholder="제목을 입력하세요"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <SizedBox height="20px" />
      <Editor
        wrapperClassName="notice_management__wrapper-class"
        editorClassName="notice_management__editor"
        toolbarClassName="notice_management__toolbar-class"
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
      {type === "알림장" ? (
        <input
          type="button"
          className="notice_management__submit-btn"
          value="전송"
          onClick={() => {
            console.log("sex");
            uploadNotice();
          }}
        />
      ) : (
        <input
          type="button"
          className="notice_management__submit-btn"
          value="전송"
          onClick={uploadNoticeForParent}
        />
      )}
    </div>
  );
};

export default NoticeManagement;
