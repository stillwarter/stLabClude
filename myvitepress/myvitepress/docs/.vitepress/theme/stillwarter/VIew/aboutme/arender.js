import { renderIntervalAstep } from "./aconfig";
/**
 * 驱动doc增加内容的通用函数--v0.1
 */

/**
 * 实现目标：
 * 做一个网页页面从0代码到完整效果的展示动画，包括展示html css js窗口展示代码，动画部分，右侧解释部分
 */

/* 基础语句的增加函数 */
export function astep(word, dom) {
  // intervalId = null;
  return new Promise((resolve, reject) => {
    const pdom = document.createElement("p");
    let i = 0;
    let len = word.length;
    let intervalId = setInterval(() => {
      if (i < len) {
        pdom.innerHTML += word[i++];
        dom.appendChild(pdom);
      } else {
        clearInterval(intervalId);
        resolve("Step result");
      }
    }, renderIntervalAstep);
  });
}

/* 基础style样式增加 */
export function addHeadStyle(stylecontent) {
  stylecontent = JSON.stringify(stylecontent)
    .toString()
    .slice(1, -1)
    .replace(/"/g, "")
    .replace(/,/g, "");
  const sdom = document.createElement("style");
  sdom.type = "text/css";
  sdom.innerHTML = stylecontent;
  document.querySelector("head").appendChild(sdom);
}

/* 多类型支持的dom增加函数 */
function astepPro(word, parentDom, domType, className = "") {
  return new Promise((resolve, reject) => {
    const dom = document.createElement(domType);
    dom.className = className;
    let i = 0;
    const len = word.length;
    intervalId = setInterval(() => {
      if (i < len) {
        dom.innerHTML += word[i++];
        parentDom.appendChild(dom);
      } else {
        // 没有word传入，也将dom添加到父节点
        parentDom.appendChild(dom);
        clearInterval(intervalId);
        resolve("Step result");
      }
    }, 50);
  });
}
