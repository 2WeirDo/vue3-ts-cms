<template>
  <div class="overview">
    <el-card class="box-card">
      <div class="item">
        <div class="c-left">
          Vue3--Admin 是基于 Vue3、Pinia、Vue-Router、Vite、 ElementPlus 、TypeScript、Echart5
          等技术实现的后台管理系统。
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.overview {
  color: beige;
  .c-left {
    text-align: left;
  }
  .el-card {
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }
}
</style>
