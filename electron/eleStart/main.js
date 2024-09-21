// const { app, BrowserWindow } = require("electron");
// const path = require("node:path");

// const createWindow = () => {
//   //  创建浏览器界面
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });
//   // 加载index.html
//   mainWindow.loadFile("index.html");
//   // 打开开发工具
//   // mainWindow.webContents.openDevTools()
// };

// /**
//  * 这段程序将在electron结束初始化
//  * 和创建浏览器窗口时调用
//  * 部分api在ready事件后触发
//  */
// app.whenReady().then(() => {
//   createWindow();
//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform != "darwin") {
//     app.quit();
//   }
// });

const { app, BrowserWindow } = require("electron/main");
const { log } = require("node:console");
const path = require("node:path");

// console.log("run index");
// log("123");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // preload: path.join("preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    console.log("activate");

    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
