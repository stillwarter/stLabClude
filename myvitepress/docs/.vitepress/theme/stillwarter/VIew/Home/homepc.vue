<template>
    <div class="homepcbox">
        <p class="hometitle">stillwarter 摸鱼达人 & 搬砖菜鸟 & 逐光者 & 弃梦人 </p>
        <p style="font-size: 12px;text-align: right;"> 中文 / EN </p>
        <ZHinfoPC />
    </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";
import { ref } from "vue"
import ZHinfoPC from "./child/ZHinfoPC.vue";

const { theme } = useData();
const postsData = theme.value.posts;
console.log(theme.value.other.post);



</script>

<style lang="less" scoped>
.homepcbox {
    /* width: 100%; */
    max-width: 700px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 12px;

    .hometitle {
        margin-top: 30px;
        font-size: 20px;
        margin-bottom: 2rem;
    }
}



/* .hometitle{} */
</style>