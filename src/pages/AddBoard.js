import React, { useEffect, useState } from "react";
import { firestore, firebaseStorage } from "../firebase";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Column, Row } from "../layout";
<<<<<<< HEAD
import { DID_FETCH_BOARD } from "../actions/types";

import $ from "jquery";
import { parseDateForFirebaseWithoutTime } from "../utils";
import { useDispatch } from "react-redux";
=======

import $ from "jquery";
import { parseDateForFirebaseWithoutTime } from "../utils";
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329

const AddBoard = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
<<<<<<< HEAD
  const dispatch = useDispatch();
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329

  useEffect(() => {
    $("body").css("overflow-y", "scroll");
  }, []);

  const uploadBoard = async () => {
    try {
<<<<<<< HEAD
=======
      const win = window.require("electron").remote.getCurrentWindow();
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
      const editorToHtml = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      const today = parseDateForFirebaseWithoutTime(new Date(Date.now()));
      const filePath = `/agreementBoard/희망반/${today}`;
      const id = makeid(10);
      const fileNames = [];
      files.forEach(async (file, index) => {
        const fileName = `${filePath}/${id}/${index
          .toString()
          .padStart(3, "0")}`;
        fileNames.push(fileName);
        await firebaseStorage.ref(fileName).put(file);
      });
      await firestore.collection("agreementBoard").add({
        fileNames: fileNames.length > 0 ? fileNames : [],
        content: editorToHtml,
        date: new Date(Date.now()),
        postIdentifier: id,
        title: title,
        uploader: "이시우",
        views: 0,
      });
      setEditorState(EditorState.createEmpty());
      setTitle("");
<<<<<<< HEAD
      const remote = window.require("@electron/remote");
      let w = remote.getCurrentWindow();
      w.close();
=======
      win.close();
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
    } catch (e) {
      console.log(e);
    }
  };

  let profile_preview = null;
  if (files.length !== 0) {
    profile_preview = previewURLs.map((previewURL) => {
      return (
        <img
          alt="preview"
          className="profile_preview"
          style={{
            height: "200px",
            width: "200px",
          }}
          src={previewURL}
        ></img>
      );
    });
  }

  return (
    <div>
      <Row>
        <label>게시물 제목</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Row>
      <Column>
        <label>게시물 세부 내용</label>
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
        <input
          type="file"
          accept=".hwp, .pdf, image/*"
          name="파일 업로드"
          multiple="multiple"
          onChange={(event) => {
            event.preventDefault();
            let files = event.target.files;
            Array.from(files).forEach((file) => {
              let reader = new FileReader();
              reader.onloadend = () => {
                setFiles((old) => [...old, file]);
                setPreviewURLs((old) => [...old, reader.result]);
              };
              if (file !== null) {
                reader.readAsDataURL(file);
              }
            });
          }}
        ></input>
      </Column>
      <Row>{profile_preview}</Row>
      <input type="button" value="전송" onClick={uploadBoard} />
    </div>
  );
};

export default AddBoard;
