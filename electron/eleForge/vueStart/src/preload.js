// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

/** */
import { regisMain } from "./preloadProcess/regis";
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  sendMessageToMain: (message) => {
    ipcRenderer.send("custom-message", message);
  },
  // sendtest: () => {

  //   ipcRenderer.send("dotest", "some argument");
  //   ipcRenderer.once("doSomethingInNodeReply", (event, result) => {
  //     console.log(result);
  //   });
  // }
  ...regisMain,
});
