<template>
  <div class="homemobilebox">
    <p class="hometitle">摸鱼达人 & 搬砖菜鸟 & 逐光者 & 弃梦人</p>
    <p
      style="
        font-size: 12px;
        text-align: r;
        padding-right: 10px;
        padding-top: 20px;
      "
    >
      <span style="cursor: pointer;" @click="setZH">中文</span> /
      <span style="cursor: pointer;" @click="setEN">EN</span>
    </p>

    <Info :lang="lang" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Info from "./child/info.vue";
const lang = ref("ZH");
const setZH = () => {
  lang.value = "ZH";
};
const setEN = () => {
  lang.value = "EN";
};
</script>

<style lang="less" scoped>
.homemobilebox {
  margin: 0 1.6rem;

  .hometitle {
    margin-top: 1rem;

    margin-bottom: 2rem;
  }
}
</style>
