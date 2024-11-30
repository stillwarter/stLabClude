/* 移动端检测 */
export function isMobile() {
  let flag =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return flag;
}


/* 窗口尺寸变化 监听设备是否改变类型 */