/**
 * 介绍渲染动画
 */
import {
  astep,
  astepPro,
  addHeadStyle,
  stepDetailImg,
  addHeadStyleSync,
  specialTipAstep,
  specialCssboxLinkAstep,
} from "./arender";

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
  for (const item of desWordsCN) {
    await specialTipAstep(item);
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

  const jsdom = document.querySelector(".jsbox");
  const cssdom = document.querySelector(".cssbox");
  setTimeout(() => {
    observer.observe(jsdom, config);
    observer.observe(cssdom, config);
  }, 0);
  contextResume();
};

/**
 * 5.前置js函数准备（展示）
 */
import { initjsFuncWords } from "./aconfig";
const contextResume = async () => {
  await specialTipAstep("准备前置需要用到的js函数");
  setTimeout(() => {
    startAni();
  }, 10);
};

/**
 * 6.正式准备绘制简历块儿 绘制外围边框
 */
import { resumeboxStyle } from "./aconfig";
async function startAni() {
  const cssdom = document.querySelector(".cssbox");
  const centerdom = document.querySelector(".center");
  await specialTipAstep("开始绘制简历内容");
  await specialTipAstep("添加一个容器装简历内容");
  await astepPro("", centerdom, "div", "resumebox");
  await specialCssboxLinkAstep("增加resume样式", resumeboxStyle);
  setRuHeadBox();
}

/**
 * 7.准备头部容器
 */
import { resumeboxHeadbox } from "./aconfig";
async function setRuHeadBox() {
  await specialTipAstep("增加简历头盒子");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "resumeHeadbox");
  await specialCssboxLinkAstep("增加简历头盒子样式", resumeboxHeadbox);
  setRuHead();
}

/**
 * 7.绘制简历头部内容
 */
import { stHeadImgStyle } from "./aconfig";
async function setRuHead() {
  const resumeboxdom = document.querySelector(".resumebox");
  const myheadurl =
    "https://file.fishpi.cn/2022/07/MOSHED2022621164630-1b1ec532.gif?imageView2/1/w/210/h/210/interlace/0/q/100";
  await specialTipAstep("添加照片");
  await stepDetailImg(resumeboxdom, myheadurl, "sthaedImg");
  await specialCssboxLinkAstep("修改照片样式", stHeadImgStyle);

  
}

/* ---------------------------------- */
/**
 * 元素增加组合（将涉及到的jsbox和cssbox绑定
 * 有时候增加元素需要联动jsbox或cssbox内容的增加，这时候就需要联动了，单独分开写很麻烦
 */

/* 窗口高度监听 */
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      checkHeight(mutation.target);
    }
  }
});
const config = { childList: true };
function checkHeight(targetElement) {
  const currentScrollHeight = targetElement.scrollHeight;
  if (targetElement.offsetHeight < currentScrollHeight) {
    targetElement.lastElementChild.scrollIntoView({ block: "end" });
  }
}
