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

  /deep/ div {
    transition: all 0.3s linear !important;
  }

  /deep/ p {
    margin: 2px;
    font-size: 14px;
  }

  /deep/ .right {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 0px !important;
  }
}
</style>
