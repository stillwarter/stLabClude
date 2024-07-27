import dayjs from "dayjs";
import path from "node:path";
import { resBackBySCode } from "../../../Utils/res/resUtils.js";
import { YEAR } from "../../baseConfig.js";
import {
  markSavePath,
  markIndexesSavePath,
  markSaveTopPath,
} from "./markpath.js";
import {
  addFile,
  getSubDirectories,
  checkIsExist,
  myreadFileSync,
  delFile,
} from "../../../Utils/File/baseControlfile.js";
import {
  addIndexFile,
  delIndexFile,
} from "../../../Utils/File/baseHandleIndexesFile.js";

export const markRouterConfig = {  
  "/api/postMarkMd": {
    name: "postmarkmd",
    info: "上传markmd",
    handle: postMarkMd,
  },
  "/api/getMarkList": {
    name: "postmarkmd",
    info: "获取某年度marklist",
    handle: getMarkList,
  },
  "/api/getMarkByName": {
    name: "getMarkByName",
    info: "根据mark名获取对应文件内容",
    handle: getFileByName,
  },
  "/api/delMarkByName": {
    name: "delMarkByName",
    info: "根据mark名删除对应文件",
    handle: delFileByName,
  },
};

/* 上传md文件 */
function postMarkMd(req, res) {
  // 文件名获取
  const { filecontent, filename, filetype } = req.parame;
  const filepath = path.join(markSavePath, filename + "." + filetype);
  // 文件写入
  addFile(markSavePath, filepath, filecontent);
  // 索引写入
  const indexname = path.join(markIndexesSavePath, "indexes.json");
  const itemIndex = {};
  itemIndex[filename] = {
    postime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    markname: filename,
    marktype: null,
  };
  addIndexFile(markIndexesSavePath, indexname, JSON.stringify(itemIndex));
  // 完成返回
  resBackBySCode(200, res);
}

/* 获取marklist */
function getMarkList(req, res) {
  if (req.parame.year === null) {
    //  没获取到year就查询本年度的
    req.parame.year = YEAR;
    getMarkListYear(req, res);
  } else {
    getMarkListYear(req, res);
  }
}

/* 获取某年份marklist（获取对应indexes json) */
async function getMarkListYear(req, res) {
  // 获取年份参数
  const { year } = req.parame;
  // 查询对应年份子文件
  const aimYearPath = path.join(markSaveTopPath, year.toString());
  const chpath = getSubDirectories(aimYearPath);
  // 获取filedata
  const data = await getIndexesJson(chpath, aimYearPath);
  // 自定义返回
  const message = {
    code: 200,
    message: "获取成功",
    data: data,
  };
  resBackBySCode(201, res, message);
  // 异步获取file data
  async function getIndexesJson(chpath, aimYearPath) {
    const result = {};
    for (const item of chpath) {
      const aimJson = path.join(aimYearPath, item.toString(), "indexes.json");
      if (checkIsExist(aimJson)) {
        const data = await myreadFileSync(aimJson, "utf-8");
        result[item] = data;
      }
    }
    return result;
  }
}

/* 根据文件名获取文件内容 */
async function getFileByName(req, res) {
  // 参数获取
  const { markname, marktime } = req.parame;
  const mouth = Number(dayjs(marktime).month() + 1);
  // 路径拼接
  const filepath = path.join(
    markSaveTopPath,
    YEAR.toString(),
    mouth.toString(),
    markname + ".md"
  );
  // 文件读取
  const ctx = await myreadFileSync(filepath, "utf-8");
  // 自定义返回
  const message = {
    code: 200,
    message: "获取成功",
    data: ctx,
  };
  resBackBySCode(201, res, message);
}

function delFileByName(req, res) {
  // 参数获取
  const { markname, marktime } = req.parame;
  const mouth = Number(dayjs(marktime).month() + 1);
  // 路径拼接
  const fileindexpath = path.join(
    markSaveTopPath,
    YEAR.toString(),
    mouth.toString(),
    "indexes.json"
  );
  const filepath = path.join(
    markSaveTopPath,
    YEAR.toString(),
    mouth.toString(),
    markname + ".md"
  );
  // 删除索引
  delIndexFile(fileindexpath, markname);
  // 删除文件
  delFile(filepath);
  // 完成返回
  resBackBySCode(200, res);
}
