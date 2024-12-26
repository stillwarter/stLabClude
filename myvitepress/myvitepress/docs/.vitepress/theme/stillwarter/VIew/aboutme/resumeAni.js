/**
 * 介绍渲染动画
 */
import {
  astep,
  astepPro,
  addHeadStyle,
  stepDetailImg,
  addHeadStyleSync,
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
  const dom = document.querySelector(".left");
  await astep("准备前置需要用到的js函数", dom);
  setTimeout(() => {
    startAni();
  }, 10);
};

/**
 * 6.正式准备绘制简历块儿 绘制外围边框
 */
import { resumeboxStyle } from "./aconfig";
async function startAni() {
  const dom = document.querySelector(".left");
  const cssdom = document.querySelector(".cssbox");
  const centerdom = document.querySelector(".center");
  await astep("开始绘制简历内容", dom);
  await astep("添加一个容器装简历内容", dom);
  await astepPro("", centerdom, "div", "resumebox");
  await astep("增加resume样式", dom);
  await astep(resumeboxStyle, cssdom);
  await addHeadStyleSync(resumeboxStyle);
  // astep(resumeboxStyle, cssdom).then(() => {
  //   addHeadStyle(resumeboxStyle);
  //   const resumeboxdom = document.querySelector(".resumebox");
  //   observer.observe(resumeboxdom, config);
  //   setTimeout(() => {
  //     setRuHead();
  //   }, 500);
  // });
}

/**
 * 7.绘制简历头部内容
 */
import { stHeadImgStyle } from "./aconfig";
async function setRuHead() {
  const resumeboxdom = document.querySelector(".resumebox");
  const leftdom = document.querySelector(".left");
  const cssdom = document.querySelector(".cssbox");
  const myheadurl =
    "https://file.fishpi.cn/2022/07/MOSHED2022621164630-1b1ec532.gif?imageView2/1/w/210/h/210/interlace/0/q/100";
  await stepDetailImg(resumeboxdom, myheadurl, "sthaedImg");
  await astep("添加照片", leftdom);
  await astep("修改照片样式", leftdom);
  astep(stHeadImgStyle, cssdom).then(() => {
    addHeadStyle(stHeadImgStyle);
  });
}

/* ---------------------------------- */
/* 常用窗口增加文字或code */
async function addWCJS(wc) {
  const jsdom = document.querySelector(".jsbox");
  await astep(wc, jsdom);
}

async function addWCss(wc) {
  const cssdom = document.querySelector(".cssbox");
  await astep(wc, cssdom);
}

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
