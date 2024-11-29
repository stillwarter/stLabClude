<template>
  <div class="stllwarterIntor">
    <div style="line-height: 30px; margin-bottom: 30px;">
      {{ nlang.hello }}
      <br />
      {{ nlang.share }}
      <br />
      {{ nlang.reason }}
    </div>

    <div style="line-height: 30px; margin-bottom: 30px;">
      {{ nlang.try }}
      <br />
      <a :href="nlang.e1.url">{{ nlang.e1.info }}</a>
      <br />
      <a :href="nlang.e2.url">{{ nlang.e2.info }}</a>
      <br />
      <a :href="nlang.e3.url">{{ nlang.e3.info }} </a>
      <br />
      ...
    </div>

    <div style="line-height: 30px; margin-bottom: 30px;">
      {{ nlang.hb }}
    </div>

    <div style="line-height: 30px; margin-bottom: 30px;">
      {{ nlang.findme }}: <br />
      Github Fishpi Bilibili
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { enLang, zhLang } from "./infoConfig";
const props = defineProps(["lang"]);

const nlang = ref(zhLang);
watch(props, () => {
  props.lang == "ZH" ? (nlang.value = zhLang) : (nlang.value = enLang);
});
</script>

<style lang="less" scoped>
.stllwarterIntor {
  a {
    color: pink;
  }
}
</style>
