import { defineConfig } from "vitepress";
import { getPosts } from "./theme/server";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "stillwarter",
  description: "no",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "blogs", link: "/allBlogs" },
      { text: "friends", link: "/myFriends" },
    ],
    other: {
      post: await getPosts(),
    },
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
