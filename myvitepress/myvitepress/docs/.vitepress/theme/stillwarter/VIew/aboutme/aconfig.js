export const renderIntervalAstep = 60;
export const renderIntervalAsepPro = 30;

export const headWords = ["stillwarter \n tas", "ttst"];

export const desWordsCN = [
  "作为一名打工社畜，简历贯穿我大部分求职过程",
  "作为一名前端开发，我总想写点有趣的东西",
  "所以这个网页页面将展示从代码如何生成一份简历",
  "现在增加基础布局效果",
];

export const layoutstyle = `
.s1{
  padding:4px;
  height:100vh;
  box-sizing: border-box;
  border: 1px solid #666;
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
}
`;
export const initjsFuncWords = `
function astep(word, dom) {
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

function addHeadStyle(stylecontent) {
  const sdom = document.createElement("style");
  sdom.type = "text/css";
  sdom.innerHTML = stylecontent;
  document.querySelector("head").appendChild(sdom);
}

function astepPro(word, parentDom, domType, className = "") {
  return new Promise((resolve, reject) => {
    const dom = document.createElement(domType);
    dom.className = className;
    let i = 0;
    const len = word.length;
    const intervalId = setInterval(() => {
      if (i < len) {
        dom.innerHTML += word[i++];
        parentDom.appendChild(dom);
      } else {
        // 没有word传入，也将dom添加到父节点
        parentDom.appendChild(dom);
        clearInterval(intervalId);
        resolve("Step result");
      }
    }, renderIntervalAsepPro);
  });
}
`;

export const resumeboxHeadbox=`
.resumeboxhead{
  display:flex;
}
`

export const stHeadImgStyle = `
.sthaedImg{
  border-radius: 50%;
  width:200px
}
`;

