/**
 * 文件读取模块
 */
import fs from "fs-extra";
/* 校验文件夹是否存在 */
export async function checkFolderExists(folderPath) {
  try {
    await fs.access(folderPath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}
// demo
// const folderToCheck = "/path/to/your/folder";
// checkFolderExists(folderToCheck)
//   .then((exists) => {
//     if (exists) {
//       console.log(`${folderToCheck} exists.`);
//     } else {
//       console.log(`${folderToCheck} does not exist.`);
//     }
//   })
//   .catch((err) => {
//     console.error("Error checking folder existence:", err);
//   });

/* 校验文件是否存在 */
export async function checkFileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}
// demo
// const fileToCheck = '/path/to/your/file.txt';
// checkFileExists(fileToCheck)
//  .then(exists => {
//     if (exists) {
//       console.log(`${fileToCheck} exists.`);
//     } else {
//       console.log(`${fileToCheck} does not exist.`);
//     }
//   })
//  .catch(err => {
//     console.error('Error checking file existence:', err);
//   });

/* 写入文件 */
export async function fseWriteFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    return true;
  } catch (err) {
    console.error("Error writing file:", err);
    return false;
  }
}
// demo
// fseWriteFile(filePath, content)
//  .then(res => {
//     if (res) {
//       console.log(`${filePath} create.`);
//     } else {
//       console.log(`${filePath} error.`);
//     }
//   })
//  .catch(err => {
//     console.error('Error file write:', err);
//   });
/* 删除文件或文件夹 */
export async function fseRemoveFile(filePath) {
  try {
    await fs.remove(filePath);
    return true;
  } catch (err) {
    console.error("Error remove file:", err);
    return false;
  }
}
/* 写入文件夹 */
export async function fseEnsureDirFile(filePath) {
  try {
    await fs.ensureDir(filePath);
    return true;
  } catch (err) {
    console.error("Error remove file:", err);
    return false;
  }
}
/* 获取目标路径下的文件夹 */
fs.readdir(targetPath)
  .then((files) => {
    const folderPromises = files.map((file) => {
      const fullPath = `${targetPath}/${file}`;
      return fs
        .stat(fullPath)
        .then((stats) => (stats.isDirectory() ? file : null));
    });
    return Promise.all(folderPromises);
  })
  .then((folders) => {
    const filteredFolders = folders.filter((folder) => folder !== null);
    console.log("Folders in the target path:", filteredFolders);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
