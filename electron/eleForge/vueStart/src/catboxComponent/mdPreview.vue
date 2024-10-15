<template>
  <div class="Preview">
    <MdPreview
      style="min-height: 80vh"
      :editorId="id"
      :modelValue="previewData"
      theme="vuepress"
    />
    <MdCatalog class="catalog" :editorId="id" :scrollElement="scrollElement" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
// preview.css相比style.css少了编辑器那部分样式
import "md-editor-v3/lib/preview.css";

defineProps(["previewData"]);

const id = "preview-only";
// const text = ref("# Hello Editor");
const scrollElement = document.documentElement;
</script>

<style lang="less" scoped>
.Preview {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  .catalog {
    width: 30%;
  }
}
</style>
