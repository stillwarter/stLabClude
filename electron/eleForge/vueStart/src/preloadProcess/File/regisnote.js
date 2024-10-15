import { ipcRenderer } from "electron";

export const regisNote = {
  sendtest: () => {
    ipcRenderer.send("noteMark", "some argument");
    ipcRenderer.once("doSomethingInNodeReply", (event, result) => {
      console.log(result);
    });
  },
  imagetest: (arg) => {
    return new Promise((resolve) => {
      ipcRenderer.send("uploadimage", arg);
      ipcRenderer.once("transferFileSuccess", (event, result) => {
        // return new Promise((resolve) => {
        //   console.log(result);
        //   resolve(result);
        // });
        // console.log(result);
        // return result;
        resolve(result);
      });
    });
  },
  // note模块 获取文件节点
  getNoteTree: () => {
    return new Promise((resolve) => {
      ipcRenderer.send("getNoteTree");
      ipcRenderer.once("notefiletree", (event, result) => {
        resolve(result);
      });
    });
  },
  // note模块 新建文件夹
  newFilePath: (path) => {
    return new Promise((resolve) => {
      ipcRenderer.send("newFilePath", path);
      // ipcRenderer.once("notefiletree", (event, result) => {
      //   resolve(result);
      // });
    });
  },
  // note模块 递归删除文件夹
  delFilePath: (path) => {
    return new Promise((resolve) => {
      ipcRenderer.send("delFilePath", path);
      // ipcRenderer.once("notefiletree", (event, result) => {
      //   resolve(result);
      // });
    });
  },
  // note模块 新增md文件
  newMdFile: (path) => {
    return new Promise((resolve) => {
      ipcRenderer.send("newMdFile", path);
      // ipcRenderer.once("notefiletree", (event, result) => {
      //   resolve(result);
      // });
    });
  },
  // note模块 删除md文件
  delMdFile: (path) => {
    return new Promise((resolve) => {
      ipcRenderer.send("delMdFile", path);
      // ipcRenderer.once("notefiletree", (event, result) => {
      //   resolve(result);
      // });
    });
  },
  // note模块 获取md文件内容
  getMdFile: (path) => {
    return new Promise((resolve) => {
      ipcRenderer.send("getMdFile", path);
      ipcRenderer.once("mdFileData", (event, result) => {
        resolve(result);
      });
    });
  },
  // note模块 保存md文件内容
  saveMdFile: (path, content) => {
    ipcRenderer.send("saveMdFile", path, content);
  },
};
