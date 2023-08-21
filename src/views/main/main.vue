<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="240px">Aside</el-aside>
      <el-container>
        <el-header height="50px">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.main {
  height: 100%;
  color: skyblue;
  .main-content {
    height: 100%;
    .el-aside {
      background-color: darkgoldenrod;
    }
    .el-header {
      background-color: antiquewhite;
    }
    .el-main {
      background-color: darkcyan;
    }
  }
}
</style>
