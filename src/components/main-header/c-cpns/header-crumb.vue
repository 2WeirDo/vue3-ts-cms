<template>
  <div class="curmb">
    <!-- 这里的 ArrowRight直接动态加载了 -->
    <el-breadcrumb separator-icon="DArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <!-- 这里一级路由是不能跳转的 -->
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/stores/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

const route = useRoute()
const userMenus = useLoginStore().userMenus
// 这里要响应式, 根据实时路径进行面包屑的更改
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.curmb {
  color: red;
}
</style>
