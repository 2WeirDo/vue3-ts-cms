<template>
  <div class="overview">
    <el-card>
      <div class="c-left">
        Vue3--cms多权限管理大师 是基于 Vue3、Pinia、Vue-Router、Vite、 ElementPlus
        、TypeScript、Echart5 等技术实现的多权限管理系统。
      </div>
    </el-card>
    <el-card class="box-card" id="demo"> </el-card>
    <el-card class="box-card" id="demo1"> </el-card>
    <el-card class="box-card" id="demo2"> </el-card>
    <el-card class="box-card" id="demo3"> </el-card>
  </div>
</template>

<script setup lang="ts">
import { Particle } from 'jparticles'
import { onMounted } from 'vue'
onMounted(() => {
  new Particle('#demo', {
    // 两粒子圆心点之间的直线距离
    proximity: 90,
    // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
    range: 100,
    lineShape: 'cube',
    opacity: 0.8,
    // 开启视差效果
    parallax: true
  })
  new Particle('#demo1', {
    // num: 30,
    // maxR: 30,
    // minR: 30,
    // range: 0,
    // color: ['#fff888', '#f9cd76', '#f7b26e', '#d5d02c']
    // 两粒子圆心点之间的直线距离
    proximity: 90,
    // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
    range: 120,
    lineShape: 'cube',
    opacity: 0.8,
    // 开启视差效果
    color: '#25dfff'
  })
  new Particle('#demo2', {
    // 两粒子圆心点之间的直线距离
    proximity: 90,
    // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
    range: 120,
    lineShape: 'cube',
    opacity: 0.8,
    // 开启视差效果
    color: '#81beaf'
  })
  new Particle('#demo3', {
    // 两粒子圆心点之间的直线距离
    proximity: 90,
    // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
    range: 120,
    lineShape: 'cube',
    opacity: 0.8,
    // 开启视差效果
    color: '#6578'
  })
})
</script>

<style lang="less" scoped>
.overview {
  .c-left {
    text-align: left;
  }
  .el-card {
    margin-bottom: 1px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }
}
</style>
