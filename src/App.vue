<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
