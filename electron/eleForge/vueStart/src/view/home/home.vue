<template>
  <div>
    this is home
    <button id="sendButton">ttt</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  // // 向主进程发送消息
  // document.getElementById("sendButton").addEventListener("click", () => {
  //   console.log('ttt c');

  //   electronAPI.sendMessageToMain("Hello from renderer!");
  // });
  // // 处理来自主进程的消息
  // electronAPI.onMessageFromMain((response) => {
  //   console.log(response);
  // });
  const sdb = document.getElementById("sendButton");
  sdb.addEventListener("click", () => {
    electronAPI.sendtest();
  });
});
</script>
