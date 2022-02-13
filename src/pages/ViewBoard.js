import React, { useCallback, useEffect, useState } from "react";
import { firebaseStorage } from "../firebase";
import { Column } from "../layout";
import Progress from "react-progressbar";

const ipcRenderer = window.require("electron").ipcRenderer;
const downloadsFolder = window.require("downloads-folder");

const ViewBoard = () => {
  const [args, setArgs] = useState({});
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState([]);

  useEffect(() => {
    ipcRenderer.send("open");
  }, []);

  ipcRenderer.once("vars", (_, args) => {
    setArgs(args);
    const fileNames = Array.from(args["fileNames"]);
    setDownloadProgress(new Array(fileNames.length).fill(0));
    fileNames.map(async (fileName, index) => {
      const ref = await firebaseStorage.ref(fileName);
      const url = await ref.getDownloadURL();
      setDownloadUrls((old) => [...old, url]);
    });
  });

  ipcRenderer.on("download progress", (_, progress) => {
    // const progressInPercentages = progress.percent * 100; // With decimal point and a bunch of numbers
    const cleanProgressInPercentages = Math.floor(progress.percent * 100); // Without decimal point
    let newProgress = Array.from(downloadProgress);
    newProgress[0] = cleanProgressInPercentages;
    setDownloadProgress(newProgress);
  });

  const toDateString = (date) => {
    const _date = new Date(date);
    return `${_date.getFullYear()}-${
      _date.getMonth() + 1 > 10
        ? _date.getMonth() + 1
        : `0${_date.getMonth() + 1}`
    }-${_date.getDate() > 10 ? _date.getDate() : `0${_date.getDate()}`} ${
      _date.getHours() > 10 ? _date.getHours() : `0${_date.getHours()}`
    }:${
      _date.getMinutes() > 10 ? _date.getMinutes() : `0${_date.getMinutes()}`
    }`;
  };

  return (
    <div>
      <Column>
        <div className="viewBoard__title">{args["title"]}</div>
        <div>
          <span>{`${args["uploader"]} 선생님`}</span>
          <span className="vl-normal" />
          <span>{toDateString(args["date"])}</span>
          <span className="vl-normal" />
          <span>{`조회 ${args["views"]}`}</span>
        </div>
        <hr className="solid" />
        <div
          dangerouslySetInnerHTML={{
            __html: args["content"],
          }}
        ></div>
        {downloadUrls.map((downloadUrl, index) => {
          return (
            <div>
              다운로드
              <div>
                <div
                  id="downloadreport"
                  onClick={() => {
                    ipcRenderer.send("download", {
                      url: downloadUrl,
                      properties: {
                        location: downloadsFolder(),
                      },
                    });
                  }}
                  // style={{ display: "none" }}
                >
                  {`첨부파일-${index + 1}`}
                </div>
                <Progress completed={downloadProgress[index]} />
                {downloadProgress[index] === 100 ? "다운로드 완료!" : null}
              </div>
            </div>
          );
        })}
      </Column>
    </div>
  );
};

export default ViewBoard;
