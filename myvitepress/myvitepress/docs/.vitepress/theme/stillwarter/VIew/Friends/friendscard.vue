<template>
  <div class="friendcard" @click="showDrawer">
    <img data-v-71d718ed="" class="avater" v-lazy="porps.data.img" />
    <div data-v-71d718ed="" class="infor">
      <h4 data-v-71d718ed="" class="thename">{{ porps.data.name }}</h4>
      <p data-v-71d718ed="" class="himdes">{{ porps.data.des }}</p>
      <p data-v-71d718ed="" class="look">{{ porps.data.look }}</p>
    </div>

    <a-drawer
      v-model:open="open"
      :title="porps.data.name"
      class="frdrawer"
      placement="right"
      :width="isMobile() ? '100%' : '378px'"
      @after-open-change="afterOpenChange"
    >
      <div class="drctx">
        <img :src="porps.data.img" alt="" class="dravater" />
        <p class="des">{{ porps.data.des }}</p>
        <p class="look">{{ porps.data.look }}</p>
        <a class="link" :href="porps.data.link">{{ porps.data.link }}</a>
        <div class="store" v-html="porps.data.store"></div>
        <a class="fishlink" target="_blank" :href="porps.data.fishlink">
          <img src="https://fishpi.cn/images/favicon.png" />
        </a>
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { isMobile } from "../../Utils";

const porps = defineProps(["data"]);

const open = ref(false);

const afterOpenChange = (bool) => {
  handleMobileOverflow(bool);
};
const showDrawer = () => {
  open.value = true;
};

// 移动端遮罩滚动处理
const handleMobileOverflow = (bool) => {
  if (bool && isMobile()) {
    setTimeout(() => {
      const frdom = document.documentElement;
      frdom.style.overflow = "hidden";
    }, 0);
  }

  if (!bool && isMobile()) {
    setTimeout(() => {
      const frdom = document.documentElement;
      frdom.style.overflow = "auto";
    }, 0);
  }
};
</script>

<style lang="less" scoped>
.friendcard {
  height: 120px;
  padding: 16px 36px;
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
  transition: all 0.5s linear;
  position: relative;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  .avater {
    width: 80px;
    height: 80px;
    border-radius: 50px;
    margin-right: 20px;
    object-fit: cover;
  }
  .infor {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .thename {
      font-size: 20px;
      font-weight: bolder;
      font-family: "catbite", Arial, "Microsoft YaHei";
    }

    .himdes {
      width: 140px;
      font-size: 16px;
      width: 14 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      font-family: "liuhuan";
    }

    .look {
      width: 140px;
      font-size: 16px;
      font-family: "liuhuan";
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.friendcard:hover {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

p {
  margin: 0;
}

.drctx {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: all 0.5s linear;
  justify-content: space-around;
  .dravater {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px pink solid;
    box-shadow: inset 0 0 1px #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 80px 0 60px 0;
  }
  .des {
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
    font-weight: bolder;
  }
  .look {
    font-weight: bolder;
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
  }
  .link {
    margin-bottom: 12px;
  }
  .store {
    cursor: none;
    text-indent: 2em;
  }
  .fishlink {
    position: relative;
    padding-bottom: 4px;
    img {
      border-radius: 50%;
      width: 30px;
    }
  }
}
</style>

<style lang="less"></style>
