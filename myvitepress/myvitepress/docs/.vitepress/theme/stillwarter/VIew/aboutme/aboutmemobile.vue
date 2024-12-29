<template>
  <div class="aboutmemobile">
    <h1>关于我</h1>
    <img
      src="https://file.fishpi.cn/2022/07/MOSHED2022621164630-1b1ec532.gif?imageView2/1/w/210/h/210/interlace/0/q/100"
      alt=""
      class="head"
    />
    <p>这个人很懒移动端没有关于信息呢</p>
    <a class="bottom" href="./">回到首页</a>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.aboutmemobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  .head {
    border-radius: 50%;
    margin: 40px 0;
  }
  .bottom {
    position: absolute;
    bottom: 30px;
  }
}
</style>
