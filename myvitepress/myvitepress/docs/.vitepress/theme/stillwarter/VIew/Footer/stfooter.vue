<template>
  <div class="stfooter">
    <div class="busuanzi">
      <span id="busuanzi_container_site_pv" style="display: none;">
        本站总访问量
        <span ref="sitepv" id="busuanzi_value_site_pv"></span>次
        <span class="post-meta-divider">|</span>
      </span>
      <span id="busuanzi_container_site_uv" style="display: none;">
        本站访客数
        <span id="busuanzi_value_site_uv"></span>人
      </span>
    </div>
  </div>
</template>

<script setup>
import busuanzi from "busuanzi.pure.js";
busuanzi;
</script>

<style lang="less" scoped>

.busuanzi {
  span {
    font-size: 12px;
  }
}
</style>
