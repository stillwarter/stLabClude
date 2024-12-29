export const renderIntervalAstep = 30;
export const renderIntervalAsepPro = 20;
export const renderIntervalJsAstep = 5;

export const headWords = ["stillwarter \n tas", "ttst"];

export const desWordsCN = [
  "这个动画大概两分钟",
  "作为一名打工社畜，简历贯穿我大部分求职过程",
  "作为一名前端开发，我总想写点有趣的东西",
  "所以这个网页页面将展示使用dom从代码到简历的实现过程",
  "现在增加基础布局效果",
];

export const layoutstyle = `
.s1{
  padding:4px;
  height:100vh;
  box-sizing: border-box;
  border: 1px solid #666;
  overflow: auto;
}
.s2{
 padding:4px;
  box-sizing: border-box;
  border-bottom: 1px solid #666;
}
`;

export const resumeboxStyle = `
.resumebox{
  width:100%;
  height:100%;
  padding:20px 30px;
  border: 1px solid pink;       
  border-radius: 4px;
  overflow:auto;
  box-sizing: border-box;
}

.resumebox p{
  font-size:16px !important;
}
`;
export const initjsFuncWords = `
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
// 页面dom渲染函数，详情请看仓库

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
`;

export const resumeboxHeadbox = `
.resumeHeadbox{
  display:flex;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
}

.resumeHeadbox p{
  font-size:16px !important;
}
`;

export const resumeboxHeadboxLine = `
.resumeHeadbox::after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: aqua;
  position: absolute;
  margin-top: 280px;
}
`;

export const stHeadImgStyle = `
.sthaedImg{
  border-radius: 50%;
  width:200px;
  margin-right:30px;
}
`;

export const stSkillListLine = `
.stSkillList::before{
  content: "";
  width: 100%;
  height: 2px;
  background-color: aqua;
  display:block;
  margin-top:15px;
  margin-bottom:15px;
}

.stSkillList::after{
  content: "";
  width: 100%;
  height: 2px;
  background-color: aqua;
  display:block;
  margin-top:15px;
  margin-bottom:15px;
}
`;

export const stWorkListStyle = `
.stWorkList{
  white-space: pre-wrap;
}
`;

/* jsbox ctx */
export const contextResumeCtx = `
const contextResume = async () => {
  await specialTipAstep("准备前置需要用到的js函数");
  await specialJsboxLinkAstep(initjsFuncWords);
  await specialJsboxLinkAstep(contextResumeCtx);
  setTimeout(() => {
    startAni();
  }, 10);
};
`;

export const startAniCtx = `
import { resumeboxStyle } from "./aconfig";
async function startAni() {
  await specialJsboxLinkAstep(startAniCtx);
  const centerdom = document.querySelector(".center");
  await specialTipAstep("开始绘制简历内容");
  await specialTipAstep("添加一个容器装简历内容");
  await astepPro("", centerdom, "div", "resumebox");
  await specialCssboxLinkAstep("增加resume样式", resumeboxStyle);
  setRuHeadBox();
}
`;

export const setRuHeadBoxCtx = `
import { resumeboxHeadbox } from "./aconfig";
async function setRuHeadBox() {
  await specialJsboxLinkAstep(setRuHeadBoxCtx);
  await specialTipAstep("增加简历头盒子");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "resumeHeadbox");
  await specialCssboxLinkAstep("增加简历头盒子样式", resumeboxHeadbox);
  setTimeout(() => {
    setRuHead();
  }, 0);
}
`;

export const setRuHeadCtx = `
import { stHeadImgStyle, setRuHeadCtx } from "./aconfig";
async function setRuHead() {
  await specialJsboxLinkAstep(setRuHeadCtx);
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
  setTimeout(() => {
    setStSkillsList();
  }, 0);
}
`;

export const setStSkillsListCtx = `
import { stSkillListLine,setStSkillsListCtx } from "./aconfig";
async function setStSkillsList() {
  await specialJsboxLinkAstep(setStSkillsListCtx);
  await specialTipAstep("增加工作技能叙述");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "stSkillList");
  const stskilllistdom = document.querySelector(".stSkillList");
  observer().observe(stskilllistdom, config);
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
`;

export const setStWorkListCtx = `
import { stWorkListStyle, setStWorkListCtx } from "./aconfig";
async function setStWorkList() {
  await specialJsboxLinkAstep(setStWorkListCtx);
  await specialTipAstep("增加工作技能叙述");
  const resumeboxdom = document.querySelector(".resumebox");
  await astepPro("", resumeboxdom, "div", "stWorkList");
  const stworklistdom = document.querySelector(".stWorkList");
  observer().observe(stworklistdom, config);
  await specialCssboxLinkAstep("......", stWorkListStyle);
  await astep("个人做的项目：", stworklistdom);
  await astep(
    'nodeStart 一个包含简易语音助手的工作台，用于记录日常工作情况和计划
     仓库地址：https://github.com/stillwarter/startnode
     项目记录：https://fishpi.cn/article/1707219341962
    ',
    stworklistdom
  );
  await astep(
    '像素动画生成器 一个简单的像素动画生成器，可以绘制像素动画
     仓库地址：https://github.com/stillwarter/vitepress-blog-stillwarter/blob/master/.vitepress/theme/mycomponents/Tool/pixeltool.vue
     开发记录：https://fishpi.cn/article/1695867524527
    ',
    stworklistdom
  );
  await astep(
    'vscode插件 一个简易 vscode 语音插件，可以用语音操控鼠标
     仓库地址：https://github.com/stillwarter/vscode-voicehandle-st
     开发记录：https://fishpi.cn/article/1713080276176
    ',
    stworklistdom
  );
  await astep(
    '摸鱼笔记 一个简易windows笔记软件，使用electron开发
     release地址：https://github.com/stillwarter/catbox/releases/tag/0.0.3
     开发记录：https://fishpi.cn/article/1731741593195
    ',
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
`;
