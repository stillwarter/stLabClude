import dayjs from "dayjs";
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";
import {
  imageSavePath,
  imageIndexesSavePath,
  imagePostBackUrl,
} from "./imagespath.js";
import { resBackBySCode } from "../../../Utils/res/resUtils.js";
import { addIndexFile } from "../../../Utils/File/baseHandleIndexesFile.js";
import { addFile } from "../../../Utils/File/baseControlfile.js";

export const imagesRouterConfig = {
  "/api/addImages": {
    name: "addimages",
    info: "上传图片",
    handle: postImages,
  },
};

/* 照片上传 */
async function postImages(req, res) {
  // 文件名获取
  const now = Date.now();
  const { ext } = await fileTypeFromBuffer(req.buffer);
  const imgName = now + "." + ext;
  const filepath = path.join(imageSavePath, imgName);
  // 照片写入
  addFile(imageSavePath, filepath, req.buffer);
  // 索引写入
  const indexname = path.join(imageIndexesSavePath, "indexes.json");
  const itemImageIndex = {};
  itemImageIndex[imgName] = {
    postime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    type: ext,
    url: path.join(imagePostBackUrl, imgName),
  };
  addIndexFile(imageIndexesSavePath, indexname, JSON.stringify(itemImageIndex));

  // 自定义返回
  const message = {
    code: 200,
    message: "上传成功",
    url: path.join(imagePostBackUrl, imgName),
  };
  resBackBySCode(201, res, message);
}
