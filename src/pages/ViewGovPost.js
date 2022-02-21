import React, { useCallback, useEffect, useState } from "react";
import { Column } from "../layout";
import Progress from "react-progressbar";

const ipcRenderer = window.require("electron").ipcRenderer;
const downloadsFolder = window.require("downloads-folder");

const ViewGovPost = () => {
  const [args, setArgs] = useState({});
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState([]);

  useEffect(() => {
    ipcRenderer.send("open");
  }, []);

  ipcRenderer.once("vars", (_, args) => {
    setArgs(args);
    const _fileNames = Object.keys(args["fileNames"]);
    setDownloadProgress(new Array(_fileNames.length).fill(0));
    _fileNames.map(async (fileName, index) => {
      const fileInfo = args["fileNames"][fileName];
      setFileNames((old) => [...old, fileInfo["파일이름"]]);
      setDownloadUrls((old) => [...old, fileInfo["파일주소"]]);
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
          console.log(downloadUrl);
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
                        directory: downloadsFolder(),
                      },
                    });
                  }}
                  // style={{ display: "none" }}
                >
                  {fileNames[index]}
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

export default ViewGovPost;
