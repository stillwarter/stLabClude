/**
 * 通过预加载脚本从渲染器访问nodejs
 */

window.addEventListener("DOMContentLoaded", () => {
  const repalceText = (selcetor, text) => {
    const ele = document.getElementById(selcetor);
    if (ele) {
      ele.innerText = text;
    }
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    repalceText(`${dependency}-version`, process.version[dependency]);
  }
});
