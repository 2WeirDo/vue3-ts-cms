<template>
  <div class="user">
    <user-search />
    <user-content />
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
</script>

<style lang="less" scoped>
.user {
  color: skyblue;
  border-radius: 8px;
}
</style>
