<template>
  <div class="homepcbox">
    <p class="hometitle">stillwarter blogs</p>
  </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";
import { ref } from "vue"
const { theme, title } = useData();
const postsData = theme.value.posts;
console.log(theme.value.other.post);
// console.log(title.value);
</script>

<style lang="less" scoped>
.homepcbox {
  /* width: 100%; */
  max-width: 700px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 12px;

  .hometitle {
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 2rem;
  }
}
</style>
