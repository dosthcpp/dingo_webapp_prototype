<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
import { firestore, firebaseStorage } from "../firebase";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Column, Row, SizedBox } from "../layout";
import { NotificationManager } from "react-notifications";

const UploadAlbum = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const uploadNotice = async () => {
    try {
      const editorToHtml = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
<<<<<<< HEAD
      const snapshots = (await firestore.collection("user").where("userType", "==", "학부모").get()).docs;
=======
      const snapshots = (await firestore.collection("user").get()).docs;
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
      const filePath = "/album/희망반/2022-01-01";
      const length = (await firebaseStorage.ref(filePath).listAll()).prefixes
        .length;
      const fileNames = [];
      files.forEach(async (file, index) => {
        const fileName = `${filePath}/${length
          .toString()
          .padStart(3, "0")}/${index.toString().padStart(3, "0")}`;
        fileNames.push(fileName);
        await firebaseStorage.ref(fileName).put(file);
      });
      for (var i = 0; i < snapshots.length; ++i) {
        const albumList =
          (
            await firestore.collection("user").doc(snapshots[i].id).get()
          ).data()["활동사진"] ?? [];
        firestore
          .collection("user")
          .doc(snapshots[i].id)
          .update({
            활동사진: [
              ...albumList,
              {
                title,
                imageLocArray: fileNames,
                contents: editorToHtml,
                createdAt: new Date(Date.now()),
              },
            ],
<<<<<<< HEAD
            lastUpdate: {
              updated: "활동사진",
              time: new Date(Date.now()),
            },
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
          });
      }
      setEditorState(EditorState.createEmpty());
      setTitle("");
<<<<<<< HEAD
      setFiles([]);
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
      NotificationManager.info("활동사진이 성공적으로 업로드되었습니다.");
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
    <div className="upload_album">
      <SizedBox height="30px" />
      <input
        className="upload_album__input-title"
        placeholder="제목을 입력하세요"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <SizedBox height="20px" />
      <Column>
        <Editor
          wrapperClassName="upload_album__wrapper-class"
          editorClassName="upload_album__editor"
          toolbarClassName="upload_album__toolbar-class"
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
          accept="image/jpg,image/png,image/jpeg,image/gif"
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
<<<<<<< HEAD
=======
      <Row>{profile_preview}</Row>
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
      <input
        type="button"
        value="전송"
        className="upload_album__submit-btn"
        onClick={uploadNotice}
      />
<<<<<<< HEAD
      <Row>{profile_preview}</Row>
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
    </div>
  );
};

export default UploadAlbum;
