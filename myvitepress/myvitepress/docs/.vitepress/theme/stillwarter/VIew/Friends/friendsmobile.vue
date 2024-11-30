<template>
  <BackRainbow>
    <div class="friendsmobile">
      <p class="hometitle">stillwarter的友人帐</p>
      <p>
        记录相遇的朋友，和我编的小故事，还有老师(虽然老师不认识我，厚颜称为老师)。
        以及一些厉害的前辈们，和值得感谢的人们...
      </p>

      <p class="f28 mb20 mt40">鱼油</p>
      <p>一起摸鱼的伙伴，相遇于偶然，下次见面会是什么时候呢？</p>
      <div class="cardctx">
        <friendscard
          v-for="(item, index) in peopledata.fishfrends"
          :key="index"
          :data="item"
        />
      </div>

      <p class="f28 mb20">老师</p>
      <p>谢谢你的回答解开我的疑惑</p>
      <div class="cardctx">
        <friendscard
          v-for="(item, index) in peopledata.teacherdata"
          :key="index"
          :data="item"
        />
      </div>

      <p class="f28 mb20">大佬</p>
      <p>领域内的传道者，是我值得学习的对象</p>
      <div class="cardctx">
        <friendscard
          v-for="(item, index) in peopledata.bigstart"
          :key="index"
          :data="item"
        />
      </div>

      <p class="f28 mb20">挚友</p>
      <p>落日桥头晓风吹，冷月江畔一人寒。</p>
      <div class="cardctx">
        <friendscard
          v-for="(item, index) in peopledata.bestfrends"
          :key="index"
          :data="item"
        />
      </div>
    </div>
  </BackRainbow>
</template>

<script setup>
import BackRainbow from "./backRainbow.vue";
import friendscard from "./friendscard.vue";
import { peopledata } from "./teacherinfo";
</script>

<style lang="less" scoped>
.friendsmobile {
  width: 100vw;
  box-sizing: border-box;
  overflow: auto;
  top: 84px;
  margin: 1.6rem 1.6rem;

  .hometitle {
    margin-top: 54px;
    font-size: 20px;
    margin-bottom: 2rem;
  }
  .cardctx {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 36px;
    margin: 34px 0;
  }
}

.f28 {
  font-size: 28px;
}

.mb20 {
  margin-bottom: 20px;
}

.mt40 {
  margin-top: 40px;
}
</style>
