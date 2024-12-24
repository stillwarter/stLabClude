<template>
  <div class="renderbox">
    <p>动画模块测试</p>
    <div class="ttt"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { astep } from "./arender";
onMounted(async () => {
    const rootdom = document.querySelector(".ttt");
    setTimeout( async () => {
        await astep("asdasdasd", rootdom);
        await astep('ccc', rootdom);
    }, 2000);
});
</script>

<style lang="less" scoped>
.renderbox {
  transition: all linear 0.3s;
}
</style>
