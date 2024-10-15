/**
 * 向主进程注册ipc
 */
import { ipcMain } from "electron";
import path from "node:path";
import fs from "node:fs";

export function regisDotest() {
  ipcMain.on("noteMark", (e, arg) => {
    const result = someNodeOperation(arg);
    // e.reply("doSomethingInNodeReply", result);
  });
  function someNodeOperation(arg) {
    return path.join(__dirname, "work");
  }

  ipcMain.on("uploadimage", (e, arg) => {
    // 获取当前时间戳
    const timestamp = Date.now();
    const tempFilePath = path.join(
      __dirname,
      "..",
      "..",
      "/test/image",
      `${timestamp}.jpg`
    );
    const urlPath = `http://localhost:3011/${timestamp}.jpg`;
    fs.writeFile(tempFilePath, arg, (err) => {
      if (err) {
        e.reply("transferFileError", err.message);
      } else {
        e.reply("transferFileSuccess", urlPath);
      }
    });
  });
}
