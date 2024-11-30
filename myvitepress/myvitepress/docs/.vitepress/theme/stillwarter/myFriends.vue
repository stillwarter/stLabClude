<template>
  <div class="stcommbox">
    <friendsmobile v-if="isMobile()" />
    <friendspc v-else />
  </div>
</template>

<script setup>
import { isMobile } from "./Utils/index.js";
import { ref, onMounted } from "vue";
import friendspc from "./VIew/Friends/friendspc.vue";
import friendsmobile from "./VIew/Friends/friendsmobile.vue";
import stfooter from "./VIew/Footer/stfooter.vue";
/* footerConfig */
const footerView = ref(true);

/* 默认是pc端口 */
const systemIsMobile = ref(false);
if (isMobile()) {
  systemIsMobile.value = true;
} else {
  systemIsMobile.value = false;
}

/* page 状态改变 */
const getMedia = () => {
  if (isMobile()) {
    systemIsMobile.value = true;
  } else {
    systemIsMobile.value = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", getMedia);
});
</script>
