<template>
  <div>
    <aboutmemobile v-if="systemIsMobile" />
    <aboutmepc v-else />
  </div>
</template>

<script setup>
import { isMobile } from "./Utils/index.js";
import aboutmemobile from "./VIew/aboutme/aboutmemobile.vue";
import aboutmepc from "./VIew/aboutme/aboutmepc.vue";
import { ref, onMounted } from "vue";

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
