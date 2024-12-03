/* 移动端检测 */

const keyw = 768;
export function isMobile() {
  let flag =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const w = window.innerWidth;
  if (w <= keyw) {
    return true;
  }

  return flag;
}

/* 窗口尺寸变化 监听设备是否改变类型 */
export function checkWindow() {
  window.addEventListener("resize", debouncedResize);
}
function debounce(func, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, delay);
  };
}
// 当前视口模式更新
function setWindowW() {
  const initw = sessionStorage.getItem("windowW");
  const innerw = window.innerWidth;
  let initPageModel;
  const curPageModel = isMobile() ? "mobile" : "pc";
  if (initw <= keyw) {
    initPageModel = "mobile";
  } else {
    initPageModel = "pc";
  }
  sessionStorage.setItem("windowW", innerw);
  if (curPageModel != initPageModel) {
    setTimeout(() => {
      location.reload(true);
    }, 0);
  }
}
const debouncedResize = debounce(function () {
  console.log(
    "窗口宽度：" + window.innerWidth + ", 窗口高度：" + window.innerHeight
  );
  setWindowW();
}, 500);

/* 判断是否是暗黑模式 */
export function getTheme() {
  const classname = document.getElementsByTagName("html")[0].className;
  return classname || "day";
}

// window.onload()=function(){
//   console.log('111');
// }
// if (document.readyState === "complete") {
//   console.log(1);
// } else {
//   console.log(2);
// }

// setInterval(() => {
//   if (document.readyState === "complete") {
//     console.log(1);
//   } else {
//     console.log(2);
//   }
// }, 1000);

export function tts() {
  return `
setInterval(() => {
  if (document.readyState === "complete") {
    console.log(1);
  } else {
    console.log(2);
  }
}, 1000);
  `;
}
