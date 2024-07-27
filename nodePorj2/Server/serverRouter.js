/**
 * 路由解析
 */
import { routerListConfig } from "../Config/routerConfig.js";
import { resBackBySCode } from "../Utils/res/resUtils.js";

/* 路由解析入口 */
export const roterParse = (req, res) => {
  // 判断当前method是否为post
  if (req.method !== "POST") {
    resBackBySCode(411, res);
  }
  // 获取参数并执行路由对应函数
  getReqCtx(req, res);
};

/*获取req的参数 并执行下一步*/
function getReqCtx(req, res) {
  const contentType = req.headers["content-type"] || "";

  if (contentType === "application/octet-stream") {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const buffer = Buffer.concat(data);
      req.buffer = buffer;
      routerFactor(req, res);
    });
  } else {
    // 获取post参数
    let str = "";
    req.on("data", (chunk) => {
      str += chunk;
    });
    req.on("end", () => {
      if (str) {
        req.parame = JSON.parse(str);
      }
      routerFactor(req, res);
    });
  }
}

/* 路由处理器 */
function routerFactor(req, res) {
  let routerfactor = null;
  if (!routerListConfig[req.url]) {
    console.log("no router config");
    resBackBySCode(505, res);
    return -1;
  } else {
    routerfactor = routerListConfig[req.url];
    routerfactor.handle(req, res);
  }
}
