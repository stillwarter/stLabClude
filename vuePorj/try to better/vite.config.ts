import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
// 项目中 src 目录的绝对路径
// __dirname 表示当前文件所在目录的绝对路径
const srcAbsolutePath: string = path.resolve(__dirname, "./src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      /**
       * options are passed on to @vue/babel-plugin-jsx
       * https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
       */
      optimize: true,
      enableObjectSlots: true,
    }),
  ],
  // vite 构建工具中的解析器配置
  resolve: {
    // 配置别名解析
    alias: {
      // 将项目文件中使用的 `@` 解析为 `src` 目录的绝对路径
      "@": srcAbsolutePath,
    },
  },
  server: {
    proxy: {
      // 接口地址代理
      "/node-work": {
        // target: "http://127.0.0.1:3099", // 接口的域名
        target: "http://127.0.0.1:3040/api",
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/node-work/, "/"),
      },
      "/fishapi": {
        // target: "http://127.0.0.1:3099", // 接口的域名
        target: "https://fishpi.cn",
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/fishapi/, "/"),
      },
    },
  },
});
