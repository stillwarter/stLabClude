<template>
  <div class="blogcardbox">
    <p style="font-size: 24px; margin-bottom: 12px;">{{ title }}</p>
    <p style="font-size: 14px; margin-bottom: 6px;">{{ introduction }}</p>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div style="display: flex; align-items: center;">
        <Icon icon="pajamas:label" />
        <span style="font-size: 12px; margin-left: 4px;">未分类</span>
      </div>

      <p>{{ date }}</p>
    </div>
  </div>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style="position: absolute; width: 0; height: 0;"
  >
    <filter id="blurFilter">
      <feGaussianBlur stdDeviation="1" />
    </filter>
  </svg>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: "2020-1-1",
  },
  introduction: {
    type: String,
    required: true,
    default: "这个人很懒没有介绍...",
  },
});
</script>

<style lang="less" scoped>
.blogcardbox {
  width: 240px;
  height: 120px;
  background-color: var(--blogcard-border-color);
  border-radius: 8px; /* 圆角边框 */
  box-shadow: 0 2px 8px var(--blogcard-boxshdadow-color); /* 添加阴影效果 */
  padding: 20px;
  margin: 20px;
  // filter: url(#blurFilter);
}
</style>
