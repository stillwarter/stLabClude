// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import { onMounted } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";

// my?
import home from "./stillwarter/home.vue";
import allBlogs from "./stillwarter/allBlogs.vue";
import myFriends from "./stillwarter/myFriends.vue";

// Drive
import PageTranfromDrive from "./stillwarter/Modules/PageTranfromDrive/PageTranfromDrive.vue"
import { PageTranfromDrive as PageTranfromDrivejs, hiddenDomReset } from "./stillwarter/Modules/PageTranfromDrive/PageTranfromDrive.js"


export default {
  extends: DefaultTheme,

  Layout: () => {
     window.onload = () => {
  PageTranfromDrivejs()
  // 监听隐藏的a标签
  const VPNavDom = document.querySelector('.VPNav')
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const targetElement = document.getElementById('VPNavScreen');
        if (targetElement) {
          // console.log('目标元素出现了！');
          // 可以在这里执行你想要的操作
          hiddenDomReset()
          // observer.disconnect(); // 停止观察，避免重复触发
        }
      }
    }
  })
  // 配置观察选项
  const config = { childList: true, subtree: true };

  // 开始观察目标父元素
  observer.observe(VPNavDom, config);
}
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Icon', Icon)
    // ...
    app.component("home", home);
    app.component("allblogs", allBlogs);
    app.component("myFriends", myFriends);
    // Drive
    app.component("PageTranfromDrive", PageTranfromDrive);
  },
} satisfies Theme;





//   onMounted(()=>{
//   // 对首页跳转进行处理（适应跳转动画）
// window.onload = () => {
//   PageTranfromDrivejs()
//   // 监听隐藏的a标签
//   const VPNavDom = document.querySelector('.VPNav')
//   const observer = new MutationObserver(function (mutationsList) {
//     for (const mutation of mutationsList) {
//       if (mutation.type === 'childList') {
//         const targetElement = document.getElementById('VPNavScreen');
//         if (targetElement) {
//           // console.log('目标元素出现了！');
//           // 可以在这里执行你想要的操作
//           hiddenDomReset()
//           // observer.disconnect(); // 停止观察，避免重复触发
//         }
//       }
//     }
//   })
//   // 配置观察选项
//   const config = { childList: true, subtree: true };

//   // 开始观察目标父元素
//   observer.observe(VPNavDom, config);
// }
// }),