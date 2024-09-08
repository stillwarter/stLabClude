<template>
  <div class="stcommbox">
    <div v-if="systemIsMobile">
      移动端正在适配中
    </div>
    <Allblogspc v-else />
  </div>
</template>

<script setup>
import { isMobile } from "./Utils";
import { ref, onMounted } from "vue";
import Allblogspc from "./VIew/Allblogs/Allblogspc.vue";
/* 默认是pc端口 */
const systemIsMobile = ref(false);

/* page 状态改变 */
const getMedia = () => {
  if (isMobile()) {
    systemIsMobile.value = true;
  } else {
    systemIsMobile.value = false;
  }
};
getMedia();


onMounted(() => {
  window.addEventListener("resize", getMedia);
});
</script>
