import fs from "node:fs";
import path from "node:path";
/**
 * 一些常用基础的控制文件的函数
 */

/* 文件覆盖写入 */
export function addFile(aimpath, filename, filecontent) {
  // 文件路径存在判断
  if (!fs.existsSync(aimpath)) {
    fs.mkdirSync(aimpath, { recursive: true });
  }
  // 文件写入
  fs.writeFile(filename, filecontent, (err) => {
    if (err) {
      console.log("文件写入失败", err);
      return -1;
    }
  });
}
/* 文件删除 */
export function delFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`删除文件时发生错误: ${err}`);
      return -1;
    }
    return 1;
  });
}
/* 获取目标路径下的所有目标文件 */
// export function getAimFile(){}
export function getSubDirectories(directoryPath) {
  return fs.readdirSync(directoryPath).filter((item) => {
    const itemPath = path.join(directoryPath, item);
    return fs.statSync(itemPath).isDirectory();
  });
}

/**
 * 文件读取promise
 */
export function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

/* 文件读取2 */
export function myreadFileSync(filename, charset) {
  return fs.readFileSync(filename, charset);
}

/* 文件存在检测 */
export function checkIsExist(filePath) {
  if (fs.existsSync(filePath)) {
    console.log("文件存在");
    return true;
  } else {
    console.log("文件不存在");
    return false;
  }
}
