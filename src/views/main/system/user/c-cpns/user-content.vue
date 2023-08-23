<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <!-- 这里是根据el-table的:data数组加上el-table-column的prop属性来遍历数据的 -->
      <!-- 注意这里prop属性的值要跟后端返回的相对应 -->
      <el-table :data="usersList" stripe style="width: 100%">
        <!-- 选择 -->
        <el-table-column align="center" type="selection" width="50px" />
        <!-- 序号 -->
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="140px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="140px" />
        <el-table-column align="center" label="状态" prop="enable" width="90px" />
        <el-table-column align="center" label="创建时间" prop="createAt" />
        <el-table-column align="center" label="更新时间" prop="updateAt" />

        <el-table-column align="center" label="操作" width="160px">
          <!-- 放置插槽 -->
          <el-button size="small" icon="Edit" type="primary" text> 编辑 </el-button>
          <el-button size="small" icon="Delete" type="danger" text> 删除 </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()

// 注意这一步是异步操作
systemStore.postUsersListAction()

// 2.获取usersList数据,进行展示
// 因为上一步是异步操作, 还没来结果
// 用storeToRefs包裹的东西就是响应式的, 这里用computed也可以
const { usersList } = storeToRefs(systemStore)
</script>

<style lang="less" scoped>
.content {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;

  .title {
    font-size: 30px;
    text-shadow:
      1px 1px 3px rgb(0, 0, 0),
      -1px 1px 4px white;
    color: rgb(55, 63, 167);
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
    height: 66px;
  }
  .el-button {
    margin-left: 2px;
    padding: 5px 8px;
  }
}
</style>
