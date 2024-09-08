<template>
  <div id="appMask"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { checkPageMoveState } from "./PageTranfromDrive";
onMounted(() => {
  checkPageMoveState();
});
</script>

<style lang="less">
/* 过渡动画css */
#appMask {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0);
  z-index: 100;

  animation-duration: 4s;
  animation-timing-function: ease-in;
  // animation-delay: 0;
  animation-fill-mode:forwards;

  border-radius: 50%;
  border-style: solid;
  border-width: 100vw;
  border-color: #000;
  // border-color: transparent;

  width: 0vw;
  height: 0vh;
}

// 页面关闭
@keyframes ClosePageAni {
  0% {
    width: 400vw;
    height: 400vw;
  }
  100% {
    width: 0vw;
    height: 0vh;
  }
}

// 页面打开
@keyframes OpenPageAni {
  0% {
    width: 0vw;
    height: 0vh;
  }
  100% {
    width: 400vw;
    height: 400vw;
  }
}
</style>
