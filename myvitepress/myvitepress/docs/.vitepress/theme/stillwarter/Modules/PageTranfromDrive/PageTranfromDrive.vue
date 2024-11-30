<template>
  <div id="appMask" v-if="!isMobile()"></div>
   <!-- <div id="appMask"></div> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { checkPageMoveState } from "./PageTranfromDrive";
import { isMobile } from "../../Utils";
onMounted(() => {
  setTimeout(() => {
    checkPageMoveState();
  }, 20);
});
</script>

<style lang="less">
/* 过渡动画css */
#appMask {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100 ;

  animation-duration: 1s;
  animation-timing-function: ease-in;
  // animation-delay: 0;
  animation-fill-mode: forwards;

  border-radius: 50%;
  border-style: solid;
  border-width: 99vw;
  border-color: #000;
  // border-color: transparent;

  width: 0vw;
  height: 0vh;
}

// 页面关闭
@keyframes ClosePageAni {
  0% {
    width: 330vw;
    height: 330vw;
  }
  100% {
    width: 30vw;
    height: 30vh;
  }
}

// 页面打开
@keyframes OpenPageAni {
  0% {
    width: 30vw;
    height: 30vh;
  }
  100% {
    width: 330vw;
    height: 330vw;
  }
}
</style>
