import request from "../tool/request";

export function postMardMd(data) {
  return request({
    url: "/addMarkMd",
    method: "post",
    data,
  });
}

export function postMardMd2(data) {
  return request({
    url: "/postMarkMd",
    method: "post",
    data,
  });
}

export function getMarkList(data) {
  return request({
    url: "/getMarkList",
    method: "post",
    data,
  });
}

export function getMarkByName(data) {
  return request({
    url: "/getMarkByName",
    method: "post",
    data,
  });
}

export function delMarkByName(data) {
  return request({
    url: "/delMarkByName",
    method: "post",
    data,
  });
}

export function synchronousToFishpi(data) {
  return request({
    url: "/synchronousToFishpi",
    method: "post",
    data,
  });
}
