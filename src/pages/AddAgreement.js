import React, { useState } from "react";
import { firestore } from "../firebase";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const AddAgreement = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  // const [subcontents, setSubcontents] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const addAgreement = async () => {
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
          ).data()["동의서"] ?? [];
        firestore
          .collection("user")
          .doc(snapshots[i].id)
          .update({
            동의서: [
              ...agreementList,
              {
                title,
                contents,
                subcontents: editorToHtml,
                createdAt: new Date(),
                isAgreed: false,
                hasNotified: false,
              },
            ],
            lastUpdate: {
              updated: "동의서",
              time: new Date(Date.now()),
            },
          });
      }
      const remote = window.require("@electron/remote");
      let w = remote.getCurrentWindow();
      w.close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>동의서 추가</h1>
      <br />
      <table>
        <tr
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <td>
            <label>동의서 제목</label>
          </td>
          <td>
            <input
              type="text"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </td>
        </tr>
        <tr
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <td>
            <label>동의서 부제목</label>
          </td>
          <td>
            <input
              type="text"
              name="contents"
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
          </td>
        </tr>
        <tr
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <td>
            <label>동의서 세부 내용</label>
          </td>
          <td>
            {/* <textarea
              style={{
                height: "500px",
                width: "70vw",
              }}
              type="text"
              name="sub_contents"
              onChange={(e) => {
                setSubcontents(e.target.value);
              }}
            /> */}
            <Editor
              // 에디터와 툴바 모두에 적용되는 클래스
              wrapperClassName="wrapper-class"
              // 에디터 주변에 적용된 클래스
              editorClassName="editor"
              // 툴바 주위에 적용된 클래스
              toolbarClassName="toolbar-class"
              // 툴바 설정
              toolbar={{
                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }}
              placeholder="내용을 작성해주세요."
              // 한국어 설정
              localization={{
                locale: "ko",
              }}
              // 초기값 설정
              editorState={editorState}
              // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
              onEditorStateChange={onEditorStateChange}
            />
          </td>
        </tr>
      </table>
      <input type="button" value="전송" name="" onClick={addAgreement} />
    </div>
  );
};

export default AddAgreement;
