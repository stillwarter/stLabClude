// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
// import { onMounted } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import antdVue from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import VueLazyLoad from 'vue-lazyload';


// my?
import home from "./stillwarter/home.vue";
import allBlogs from "./stillwarter/allBlogs.vue";
import myFriends from "./stillwarter/myFriends.vue";

// Drive
import PageTranfromDrive from "./stillwarter/Modules/PageTranfromDrive/PageTranfromDrive.vue";
import {
  PageTranfromDrive as PageTranfromDrivejs,
  hiddenDomReset,
} from "./stillwarter/Modules/PageTranfromDrive/PageTranfromDrive.js";

import bm from "./stillwarter/VIew/backmove/index.vue";
import { checkWindow } from "./stillwarter/Utils/index.js";

export default {
  extends: DefaultTheme,

  Layout: () => {
    window.onload = () => {
      // 记录初始化页面尺寸
      sessionStorage.setItem('windowW',window.innerWidth)
      PageTranfromDrivejs();
      // 监听隐藏的a标签
      const VPNavDom: any = document.querySelector(".VPNav");
      const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            const targetElement = document.getElementById("VPNavScreen");
            if (targetElement) {
              // console.log('目标元素出现了！');
              // 可以在这里执行你想要的操作
              setTimeout(() => {
                hiddenDomReset();
              }, 0);
              // observer.disconnect(); // 停止观察，避免重复触发
            }
          }
        }
      });
      // 配置观察选项
      const config = { childList: true, subtree: true };

      // 开始观察目标父元素
      observer.observe(VPNavDom, config);
    };
    
    // 屏幕尺寸改变监听
    checkWindow()

    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "layout-bottom": () => h(bm),
    });
  },
  enhanceApp({ app, router, siteData }) {
    //vue-design
    app.use(antdVue);
    // 懒加载
    app.use(VueLazyLoad, {
      // error: '/static/images/defaultAvatar.png', // 此处是图片加载失败时候 显示的图片
      // loading: '/static/images/defaultAvatar.png', // 此处是图片加载中 显示的图片
      attempt: 1, // 加载一屏图片
      preLoad: 1, // 失败尝试次数
    });
    // ...
    app.component("Icon", Icon);
    // ...
    app.component("home", home);
    app.component("allblogs", allBlogs);
    app.component("myFriends", myFriends);
    // Drive
    app.component("PageTranfromDrive", PageTranfromDrive);
  },
} satisfies Theme;

