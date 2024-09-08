/**
 * 页面过渡驱动
 * 在需要过渡的时候开启过渡动画
 */
export const PageTranfromDrive = () => {
  resetHeadMeun();
  setAniStatus();
};

/* 重置a标签 阻止默认跳转 */
function resetHeadMeun() {
  const alink = document.querySelectorAll(".VPLink");
  for (const item of alink) {
    item.href = "javascript:void(0)";
    item.onclick = headMeunLink;
  }
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
function headMeunLink() {
  // console.log("进入跳转动画");
  const appMaskDom = document.querySelector("#appMask");
  ClosePageAni(appMaskDom);
  setAniStatus(true);
  setTimeout(() => {
    window.location.href = "./allBlogs.html";
  }, 3000);
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
  }, 4000);
}

/* 设置全局状态 默认为true */
function setAniStatus(vlaue = true) {
  localStorage.setItem("pageAniStatus", vlaue);
}

/* 适应小尺寸 */
export const hiddenDomReset = () => {
  resetHeadMeun();
};
