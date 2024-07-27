import request from "../tool/request";

export function readMyLog() {
  return request({
    url: "/test",
    method: "post",
  });
}