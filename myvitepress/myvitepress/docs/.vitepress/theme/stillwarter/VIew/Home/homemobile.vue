<script setup lang="ts">
import ZHinfoMobile from "./child/ZHinfoMobile.vue";
</script>

<template>
  <div class="homemobilebox">
    <p
      style="
        font-size: 12px;
        text-align: left;
        padding-right: 10px;
        padding-top: 20px;
      "
    >
      中文 / EN
    </p>

    <p class="hometitle">摸鱼达人 & 搬砖菜鸟 & 逐光者 & 弃梦人</p>
    <ZHinfoMobile />
  </div>
</template>

<style lang="less" scoped>
.homemobilebox {
  margin: 0 1.6rem;

  .hometitle {
    margin-top: 1rem;

    margin-bottom: 2rem;
  }
}
</style>
