import request from "../tool/request";

/* 图片文件上传 */
export function postImages(data) {
  return request({
    // url: "/edit/postImages",
    url: "/addImages",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/octet-stream", // 重点2
    },
  });
}
