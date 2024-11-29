<template>
  <div class="homepcbox">
    <p class="hometitle">stillwarter blogs</p>

    <div v-for="(item, index) in yearmdlist" :key="index">
      <p style="font-size: 24px; margin: 8px 0px;">{{ item.year }}</p>
      <div class="yearbox">
        <div v-for="(mditem, mdindex) in item.value" :key="mdindex">
          <a class="mditem" :href="mditem.regularPath.replace('docs/', '')"
            ><blogCard :title="mditem.filename" :date="mditem.frontMatter.date"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";
import { ref } from "vue";
import blogCard from "./blogcard/blogCard.vue";
const { theme, title } = useData();
const postsData = theme.value.posts;
/* 初始mdlist*/
const mdlist = theme.value.other.post;
/* 获取年份md对象 */
const ymdobj = ref({});
const getYmdObj = () => {
  mdlist.map((item) => {
    ymdobj.value[item.yearinfo] = [];
  });

  mdlist.map((item) => {
    ymdobj.value[item.yearinfo].push(item);
  });
};
getYmdObj();
/* obj 转数组 */
const yearmdlist = ref([]);
const obj2arry = (obj) => {
  const key = Object.keys(obj);
  const values = Object.values(obj);
  const arr = [];
  for (const k in key) {
    arr.push({
      year: key[k],
      value: values[k],
    });
  }
  return arr.sort((a, b) => b.year - a.year);
};

yearmdlist.value = obj2arry(ymdobj.value);
</script>

<style lang="less" scoped>
.homepcbox {
  /* width: 100%; */
  max-width: 840px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 12px;

  .hometitle {
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 2rem;
  }

  .yearbox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

.mditem {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  cursor: pointer;
}
</style>
