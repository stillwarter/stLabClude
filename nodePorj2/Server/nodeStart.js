import http from "http";
import { HTTP_PORT } from "../Config/baseConfig.js";
import { roterParse } from "./serverRouter.js";
import { readFile } from "../Utils/File/baseControlfile.js";

/* node server初始化 */
export const serverInit = (options) => {
  const server = http.createServer(options, (req, res) => {
    /* favicon请求检测 */
    if (req.url.indexOf("/favicon.ico") !== -1) {
      return 0;
    } else if (req.url.indexOf("/Static/") !== -1) {
      /* 静态资源文件处理 */
      console.log("获取静态资源");
      console.log(req.url);
      readFile("." + req.url).then((data) => {
        console.log("." + req.url);
        res.write(data,"binary");
        res.end();
      });
      return 1;
    } else if (req.url.indexOf("/api") !== -1) {
      /* 路由解析 */
      console.log("交由路由解析");
      roterParse(req, res);
    }
  });
  server.listen(HTTP_PORT);
  console.log(`server start at ${HTTP_PORT}`);
};
