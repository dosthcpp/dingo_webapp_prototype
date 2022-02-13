const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const remoteMain = require("@electron/remote/main");
const path = require("path");
const url = require("url");
const els = require("electron-localshortcut");
const isDev = require("electron-is-dev");

let win;

function createWindow() {
  /*
   * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
   * */
  remoteMain.initialize();
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.resolve(__dirname, "./preload.js"),
    },
  });
  remoteMain.enable(win.webContents);

  /*
   * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
   * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
   * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
   * */
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  /*
   * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
   * */
  /*
  if(isDev) {
    win.loadURL(startUrl);
  } else {
    win.loadFile("build/index.html");
  }
  */
  win.loadURL(startUrl);
  
  // ipcMain.on("download", (event, info) => {
  //   download(BrowserWindow.getFocusedWindow(), info.url, info.properties).then(
  //     (dl) => win.webContents.send("download complete", dl.getSavePath())
  //   );
  // });

  els.register(win, "F12", () => {
    win.webContents.toggleDevTools();
  });

  win.on("closed", () => {
    app.quit();
  });
}

app.on("ready", createWindow);

// app.on("browser-window-focus", function () {
//   globalShortcut.register("CommandOrControl+R", () => {
//     console.log("CommandOrControl+R is pressed: Shortcut Disabled");
//   });
//   globalShortcut.register("F5", () => {
//     console.log("F5 is pressed: Shortcut Disabled");
//   });
// });
