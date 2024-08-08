import request from "../tool/requestfish";

/* 获取fishkey */
export function getfishkey(data) {
  return request({
    // url: "/edit/postImages",
    url: "/api/getKey",
    method: "post",
    data,
  });
}

/* 发帖 */
export function postLocalMd(data) {
  return request({
    // url: "/edit/postImages",
    url: "/article",
    method: "post",
    data,
  });
}

/**
 *
 * ec981fb5b02c194720e25b3b977b4923ecf3e417f322b6c419361d7573cc1832a67363bbc99717c60e7bca8bf0366a6f78868700bc60d6c18949b60a7e039afcc249f8adf4ffec36a45b4dc287a8d38ad5735399e667d21c5cc4c6ce663a3763
 */
