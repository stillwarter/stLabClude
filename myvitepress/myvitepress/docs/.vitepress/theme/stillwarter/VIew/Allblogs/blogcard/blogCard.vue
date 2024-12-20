<template>
  <div class="blogcardbox">
    <p class="title">{{ title }}</p>
    <p class="intro">
      {{ introduction }}
    </p>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div style="display: flex; align-items: center;">
        <Icon icon="pajamas:label" />
        <span class="type">未分类</span>
      </div>

      <p class="date">{{ date }}</p>
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
p {
  margin-bottom: 0;
}
.blogcardbox {
  width: 240px;
  height: 120px;
  background-color: var(--blogcard-border-color);
  border-radius: 8px; /* 圆角边框 */
  box-shadow: 0 2px 8px var(--blogcard-boxshdadow-color); /* 添加阴影效果 */
  padding: 20px;
  margin: 20px;
  box-sizing: border-box;
  // filter: url(#blurFilter);
  .title {
    font-size: 24px;
    margin-bottom: 12px;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .intro {
    font-size: 14px;
    margin-bottom: 6px;
  }
  .type {
    font-size: 12px;
    margin-left: 4px;
  }
}

@media screen and (max-width: 480px) {
  .blogcardbox {
    width: 160px;
    height: 80px;
    background-color: var(--blogcard-border-color);
    border-radius: 4px; /* 圆角边框 */
    box-shadow: 0 1px 4px var(--blogcard-boxshdadow-color); /* 添加阴影效果 */
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;
    // filter: url(#blurFilter);
    .title {
      font-size: 12px;
      line-height: 12px;
    }
    .intro {
      font-size: 8px;
      line-height: 8px;
    }
    .type {
      font-size: 6px;
      line-height: 6px;
    }
    .date {
      font-size: 10px;
      display: flex;
      justify-content: center;
      margin-bottom: 0;
    }
  }
}
</style>
