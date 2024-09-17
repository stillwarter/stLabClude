<script setup>
// examples
import firstThree from "./components/Start/firstThree.vue"
import drawLine from "./components/Start/drawLine.vue"
import css3d_molecules from "./components/Start/examples/css3d_molecules.vue"
import css3d_orthographic from "./components/Start/examples/css3d_orthographic.vue"
import css3d_periodictable from "./components/Start/examples/css3d_periodictable.vue"

// practice
import threebase from "./components/Practice/threebase.vue"
</script>

<template>
  <!-- <firstThree /> -->
  <!-- <drawLine /> -->
  <!-- <css3d_molecules /> -->
  <!-- <css3d_orthographic /> -->
  <!-- <css3d_periodictable /> -->
  <threebase />

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
