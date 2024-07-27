/* routerhandle 需要的path配置 */
import path from "node:path";
import { PATH_FILE, MOUNTH, YEAR, HTTP_PORT } from "../../baseConfig.js";

/* 照片存储文件夹 */
export const imageSavePath = path.join(
  PATH_FILE,
  "image",
  YEAR.toString(),
  MOUNTH.toString()
);

/* 照片索引存储文件夹 */
export const imageIndexesSavePath = path.join(
  PATH_FILE,
  "image",
  YEAR.toString(),
  MOUNTH.toString()
);

/* 照片上传后在线路径 */
export const imagePostBackUrl = path.join(
  `localhost:${HTTP_PORT}/Static/image`,
  YEAR.toString(),
  MOUNTH.toString()
);
