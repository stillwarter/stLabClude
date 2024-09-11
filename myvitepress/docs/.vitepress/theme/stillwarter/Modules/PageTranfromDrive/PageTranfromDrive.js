/* 动画持续时间 */
export const anidelay = 1;

/**
 * 页面过渡驱动
 * 在需要过渡的时候开启过渡动画
 */
export const PageTranfromDrive = () => {
  resetHeadMeun();
  setAniStatus();
};

const nav = [
  { text: "Home", link: "/" },
  { text: "blogs", link: "/allBlogs" },
  { text: "Examples", link: "/api-examples" },
];

/* 重置a标签 阻止默认跳转 */
function resetHeadMeun() {
  const alink = document.querySelectorAll(".VPLink");
  nav.map((item, index) => {
    alink[index].href = "javascript:void(0)";
    alink[index].onclick = headMeunLink;
    alink[index].link = item.link;
    alink[index].linktext = item.text;
  });
}

/* 维护一下动画状态 */
/* 判断是否需要加载 */
export const checkPageMoveState = () => {
  const state = localStorage.getItem("pageAniStatus");
  if (state) {
    const appMaskDom = document.querySelector("#appMask");
    startTrans(appMaskDom);
  }
};

/* 跳转点击（进入跳转动画 */
function headMeunLink(e) {
  // console.log("进入跳转动画");
  const appMaskDom = document.querySelector("#appMask");
  ClosePageAni(appMaskDom);
  setAniStatus(true);
  setTimeout(() => {
    // window.location.href = "./allBlogs.html";
    // console.log(e.target.textContent);
    const textctx = e.target.textContent;

    const alink = document.querySelectorAll(".VPLink");
    for (const item of alink) {
      console.log(item.link);
      if (item.linktext == textctx) {
        window.location.href = item.link;
        break;
      }
    }
  }, (anidelay + 0.1) * 1000);
}

/* 关闭页面动画 */
function ClosePageAni(appMaskDom) {
  appMaskDom.style.zIndex = "100";
  appMaskDom.style.animationName = "ClosePageAni";
  appMaskDom.style.borderColor = "#000";
}

/* 打开页面动画 */
function startTrans(appMaskDom) {
  appMaskDom.style.animationName = "OpenPageAni";
  setTimeout(() => {
    appMaskDom.style.zIndex = "-1";
  }, (anidelay + 1) * 1000);
}

/* 设置全局状态 默认为true */
function setAniStatus(vlaue = true) {
  localStorage.setItem("pageAniStatus", vlaue);
}

/* 适应小尺寸 */
export const hiddenDomReset = () => {
  resetHeadMeun();
};
