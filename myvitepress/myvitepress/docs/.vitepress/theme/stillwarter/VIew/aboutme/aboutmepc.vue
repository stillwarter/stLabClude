<template>
  <div class="renderbox"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { aboutmeHeadWOrds, clayoutSet, tipboxSet } from "./resumeAni";
onMounted(async () => {
  setTimeout(async () => {
    // aboutmeHeadWOrds();
    clayoutSet();
  }, 1000);
});
</script>

<style lang="less" scoped>
.renderbox {
  transition: all linear 0.3s;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100vh;
  box-sizing: border-box;
  :deep(div) {
    transition: all 0.3s linear !important;
  }

  :deep(img) {
    transition: all 0.3s linear;
  }

  :deep(p) {
    margin: 2px;
    font-size: 14px;
  }

  :deep(.right) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 0px !important;
    .jsbox {
      white-space: pre-wrap;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      p {
        font-size: 12px;
      }
    }
    .cssbox {
      white-space: pre-wrap;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      p {
        font-size: 12px;
      }
    }
  }
}
</style>
