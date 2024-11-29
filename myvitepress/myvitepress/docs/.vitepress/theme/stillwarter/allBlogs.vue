<template>
  <div class="stcommbox">
    <Allblogsmobile v-if="systemIsMobile" />
    <Allblogspc v-else />
  </div>
</template>

<script setup>
import { isMobile } from "./Utils/index.js";
import { ref, onMounted } from "vue";
import Allblogspc from "./VIew/Allblogs/Allblogspc.vue";
import Allblogsmobile from "./VIew/Allblogs/Allblogsmobile.vue";
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
