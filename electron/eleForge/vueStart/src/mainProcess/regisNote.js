/**
 * 向主进程注册note操作模块
 */
import { ipcMain } from "electron";
import path from "node:path";
import fs from "fs-extra";
// import fs from "node:fs";
import { noteConfig } from "../config/baseConfig";
export function regisNoteModule() {
  /* 获取文件树结构 */
  ipcMain.on("getNoteTree", (e, arg) => {
    // readFolderRecursively(noteConfig)
    //   .then((res) => {
    //     console.log(res, "notetree");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // // getAll(0, noteConfig);
    const a = getFolderTree(noteConfig);
    e.reply("notefiletree", a);
  });

  /* 新建文件夹 */
  ipcMain.on("newFilePath", (e, arg) => {
    newFilePathRoot(arg);
  });

  /* 新建md记录文件 */
  ipcMain.on("newMdFile", (e, arg) => {
    newMdFile(arg);
  });

  /* 删除文件夹 */
  ipcMain.on("delFilePath", (e, arg) => {
    delFilePath(arg);
  });

  /* 删除md文件 */
  ipcMain.on("delMdFile", (e, arg) => {
    delMdFile(arg);
  });

  /* 获取md文件内容 */
  ipcMain.on("getMdFile", (e, arg) => {
    const data = getMdFile(arg);
    // console.log(data);
    e.reply("mdFileData", data);
  });

  /* 保存md编辑内容 */
  ipcMain.on("saveMdFile", (e, arg, content) => {
    saveMdFile(arg, content);
  });
}

let key = 0;
function getFolderTree(folderPath) {
  const items = fs.readdirSync(folderPath);
  return items.map((item) => {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);
    key++;
    if (stats.isDirectory()) {
      return {
        name: item,
        key,
        type: "directory",
        path: itemPath,
        children: getFolderTree(itemPath),
      };
    } else {
      return {
        name: item,
        type: "file",
        path: itemPath,
        key,
      };
    }
  });
}

/* 新建文件夹路径 */
function newFilePathRoot(path) {
  fs.mkdir(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("文件夹创建成功！");
    }
  });
}

/* 新建空md文件 */
function newMdFile(path) {
  fs.writeFile(path, "", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Markdown file created successfully.");
    }
  });
}

/* 删除文件夹路径(递归) */
function delFilePath(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = `${folderPath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // 如果是文件夹，递归删除
        delFilePath(curPath);
      } else {
        // 如果是文件，直接删除
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

/* 删除md文件 */
function delMdFile(folderPath) {
  fs.unlink(folderPath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("文件删除成功！");
    }
  });
}

/* 获取md内容 */
function getMdFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

/* 保存md内容 */
function saveMdFile(filePath, content) {  
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("保存文件时出错：", err);
    } else {
      console.log("文件已成功保存。");
    }
  });
}
