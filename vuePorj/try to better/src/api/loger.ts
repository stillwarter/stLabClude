import request from "../tool/request";

/* 获取本年度所有日志信息 */
export function readAllLog() {
  return request({
    url: "/getAllLoger",
    method: "post",
  });
}
