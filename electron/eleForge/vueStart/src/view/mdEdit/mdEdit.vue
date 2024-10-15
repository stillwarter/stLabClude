<template>
  <div>
    <MdEditor
      style="min-height: 80vh;"
      ref="mdeditor"
      @onUploadImg="onUploadImg"
    />
  </div>
</template>

<script setup>
import "md-editor-v3/lib/style.css";
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
const mdeditor = ref(null);

const onUploadImg = async (files, callback) => {
  files.map((file) => {
    fileToBuffer(file).then(async (buffer) => {
      const aimurl = await electronAPI.imagetest(buffer);
      console.log(aimurl);
    });
  });
};

function fileToBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const buffer = new Uint8Array(arrayBuffer);
      resolve(buffer);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}
</script>
