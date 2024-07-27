/* routerhandle 需要的path配置 */
import path from "node:path";
import { PATH_FILE, MOUNTH, YEAR } from "../../baseConfig.js";

/* mark存储文件夹 */
export const markSavePath = path.join(
  PATH_FILE,
  "mark",
  YEAR.toString(),
  MOUNTH.toString()
);

/* mark索引存储文件夹 */
export const markIndexesSavePath = path.join(
  PATH_FILE,
  "mark",
  YEAR.toString(),
  MOUNTH.toString()
);

/* mark存储总文件夹（用于获取list） */
export const markSaveTopPath = path.join(PATH_FILE, "mark");
