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
