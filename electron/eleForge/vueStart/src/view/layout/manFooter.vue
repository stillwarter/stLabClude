<template>
  <div class="mainfooter">
    <p class="pointer" @click="showModal">setting</p>
  </div>

  <div>
    <a-modal v-model:open="open" title="配置笔记工作环境" @ok="handleOk">
      <p>Some contents...</p>
      
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const open = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = (e) => {
  console.log(e);
  open.value = false;
};
</script>

<style scoped>
.mainfooter {
  position: fixed;
  bottom: 0;
  border-top: 1px solid #000;
  width: 100vw;
  box-sizing: border-box;
  padding: 2px;
}
</style>
