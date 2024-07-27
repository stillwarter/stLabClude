/**
 * 全局状态初始化
 */

export function initState() {
  // 重写localstorage 监听事件（同页面监听 单页面）
  const originalSetItem: any = localStorage.setItem;
  localStorage.setItem = function (key, newValue) {
    const setItemEvent: any = new Event("setItemEvent");
    setItemEvent.newValue = newValue;
    setItemEvent.key = key;
    window.dispatchEvent(setItemEvent);
    originalSetItem.apply(this, arguments);
  };
  /* 侧边路由栏展开情况 */
  localStorage.setItem("sliderState", "true");
}

// export function updataStete() {
//   console.log("up");
// }
