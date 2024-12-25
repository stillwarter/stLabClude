/**
 * 介绍渲染动画
 */
import { astep, astepPro, addHeadStyle } from "./arender";

/**
 * 1.开头语
 */
import { headWords } from "./aconfig";
export const aboutmeHeadWOrds = async () => {
  const rootdom = document.querySelector(".renderbox");
  for (const item of headWords) {
    await astep(item, rootdom);
  }
};

/**
 * 2.基础布局
 */
export const clayoutSet = async () => {
  const rootdom = document.querySelector(".renderbox");
  await astepPro("", rootdom, "div", "left");
  await astepPro("", rootdom, "div", "center");
  await astepPro("", rootdom, "div", "right ");
  setTimeout(() => {
    tipboxSet();
  }, 0);
};

/**
 * 3.展示说明块内容 开始书写
 */
import { desWordsCN } from "./aconfig";
import { setClassname } from "./arender";
import { layoutstyle } from "./aconfig";
export const tipboxSet = async () => {
  const rootdom = document.querySelector(".left");
  for (const item of desWordsCN) {
    await astep(item, rootdom);
  }
  setTimeout(() => {
    addHeadStyle(layoutstyle);
  }, 10);
  setTimeout(() => {
    const doml = document.querySelector(".left");
    const domc = document.querySelector(".center");
    const dmor = document.querySelector(".right");
    setClassname(doml, "s1");
    setClassname(domc, "s1");
    setClassname(dmor, "s1");
    cssandjsTipboxSet();
  }, 20);
};

/**
 * 4.增加js和css说明块内容
 */
export const cssandjsTipboxSet = async () => {
  const dom = document.querySelector(".right");
  await astepPro("jscode:", dom, "div", "jsbox s2");
  await astepPro("csscode:", dom, "div", "cssbox s2");
};

/**
 * 5.
 */
export const contextResume=()=>{}