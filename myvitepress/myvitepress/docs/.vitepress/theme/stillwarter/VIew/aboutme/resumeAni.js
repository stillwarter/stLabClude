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
  specialJsboxLinkAstep,
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
  const tipdom = document.querySelector(".left");
  setTimeout(() => {
    observer.observe(jsdom, config);
    observer.observe(cssdom, config);
    observer.observe(tipdom, config);
    contextResume();
  }, 0);
};

/**
 * 5.前置js函数准备（展示）
 */
import { initjsFuncWords } from "./aconfig";
const contextResume = async () => {
  await specialTipAstep("准备前置需要用到的js函数");
  await specialJsboxLinkAstep(initjsFuncWords);
  await specialJsboxLinkAstep(
    "contextResume=" + contextResume.toString().replace(/\n/g, "")
  );
  setTimeout(() => {
    startAni();
  }, 10);
};

/**
 * 6.正式准备绘制简历块儿 绘制外围边框
 */
import { resumeboxStyle } from "./aconfig";
async function startAni() {
  await specialJsboxLinkAstep(startAni.toString().replace(/\n/g, ""));
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
  await specialJsboxLinkAstep(setRuHeadBox.toString().replace(/\n/g, ""));
  await specialTipAstep("增加简历头盒子");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "resumeHeadbox");
  await specialCssboxLinkAstep("增加简历头盒子样式", resumeboxHeadbox);
  setTimeout(() => {
    setRuHead();
  }, 0);
}

/**
 * 7.绘制简历头部内容
 */
import { stHeadImgStyle, resumeboxHeadboxLine } from "./aconfig";
async function setRuHead() {
  await specialJsboxLinkAstep(setRuHead.toString().replace(/\n/g, ""));
  const resumeboxHeaddom = document.querySelector(".resumeHeadbox");
  const myheadurl =
    "https://file.fishpi.cn/2022/07/MOSHED2022621164630-1b1ec532.gif?imageView2/1/w/210/h/210/interlace/0/q/100";
  await specialTipAstep("添加照片");
  await stepDetailImg(resumeboxHeaddom, myheadurl, "sthaedImg");
  await specialCssboxLinkAstep("修改照片样式", stHeadImgStyle);
  await specialTipAstep("增加关于我叙述内容");
  await astepPro("", resumeboxHeaddom, "div", "sthaedInfo");
  const stheadInfodom = document.querySelector(".sthaedInfo");
  await astep("stillwarter", stheadInfodom);
  await astep("关于我...", stheadInfodom);
  await astep(
    "2025是我工作的第三年初始,感觉也没有太多进步，只是缓慢学习中...",
    stheadInfodom
  );
  await astep(
    "觉得code并不那么容易，每个bug有他脾气，过了爱内卷的年纪，盲目code不如摸鱼~",
    stheadInfodom
  );
  await astep(
    "想把自己创造的东西囤积起来，在回首时分，不会认为自己虚度光影。",
    stheadInfodom
  );
  await astep("这也是stillwarter.github.io存在的初衷。", stheadInfodom);
  await specialCssboxLinkAstep("增加分界线", resumeboxHeadboxLine);
  setTimeout(() => {
    setStSkillsList();
  }, 0);
}

/**
 * 8.工作技能叙述
 */
import { stSkillListLine } from "./aconfig";
async function setStSkillsList() {
  await specialJsboxLinkAstep(setStSkillsList.toString().replace(/\n/g, ""));
  await specialTipAstep("增加工作技能叙述");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "stSkillList");
  const stskilllistdom = document.querySelector(".stSkillList");
  observer.observe(stskilllistdom, config);
  await astep("积累的技能：", stskilllistdom);
  await astep(
    "javascript，熟悉js，会用原生js来写一些奇怪的效果",
    stskilllistdom
  );
  await astep("node，会用node一些常用api", stskilllistdom);
  await astep(
    "vue/react，会用vue和react作为前端开发的主要框架，个人多用vue3",
    stskilllistdom
  );
  await astep("electorn，会用elctron开发一些简单的桌面软件", stskilllistdom);
  await astep("未来会学习更多技能，创造更加神奇的页面效果！", stskilllistdom);
  await specialCssboxLinkAstep("增加分界线", stSkillListLine);
  setTimeout(() => {
    setStWorkList();
  }, 0);
}

/**
 * 9.个人开源作品叙述
 */
import { stWorkListStyle } from "./aconfig";
async function setStWorkList() {
  await specialJsboxLinkAstep(setStWorkList.toString().replace(/\n/g, ""));
  await specialTipAstep("增加工作技能叙述");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "stWorkList");
  const stworklistdom = document.querySelector(".stWorkList");
  observer.observe(stworklistdom, config);
  await specialCssboxLinkAstep("......", stWorkListStyle);
  await astep("个人做的项目：", stworklistdom);
  await astep(
    `nodeStart 一个包含简易语音助手的工作台，用于记录日常工作情况和计划
     仓库地址：https://github.com/stillwarter/startnode
     项目记录：https://fishpi.cn/article/1707219341962
    `,
    stworklistdom
  );
  await astep(
    `像素动画生成器 一个简单的像素动画生成器，可以绘制像素动画
     仓库地址：https://github.com/stillwarter/vitepress-blog-stillwarter/blob/master/.vitepress/theme/mycomponents/Tool/pixeltool.vue
     开发记录：https://fishpi.cn/article/1695867524527
    `,
    stworklistdom
  );
  await astep(
    `vscode插件 一个简易 vscode 语音插件，可以用语音操控鼠标
     仓库地址：https://github.com/stillwarter/vscode-voicehandle-st
     开发记录：https://fishpi.cn/article/1713080276176
    `,
    stworklistdom
  );
  await astep(
    `摸鱼笔记 一个简易windows笔记软件，使用electron开发
     release地址：https://github.com/stillwarter/catbox/releases/tag/0.0.3
     开发记录：https://fishpi.cn/article/1731741593195
    `,
    stworklistdom
  );
  await astep(
    "更多请浏览：https://fishpi.cn/member/stillwarter",
    stworklistdom
  );
  setTimeout(() => {
    resumend();
  }, 0);
}

/**
 * 10.小结
 */
async function resumend() {
  await specialTipAstep("灵感源于：https://czx.me/");
  await specialTipAstep(
    "早先版本：https://github.com/stillwarter/resume-animation-stillwarter"
  );
  await specialTipAstep(
    "更早的这版可能更好看，但是逻辑没有这版舒展，真不知道我tm当时怎么写完的"
  );
  await specialTipAstep("至于生成器的版本，再让我想想如何更好再下手吧");
  await specialTipAstep("以上，感谢观看");
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
  const worklistdom = document.querySelector(".stWorkList");
  if (targetElement == worklistdom) {
    const pdom = document.querySelector(".resumebox");
    pdom.lastElementChild.scrollIntoView({ block: "end" });
  }
}
