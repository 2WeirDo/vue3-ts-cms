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
        <el-table-column align="center" type="index" label="序号" width="80px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />

        <!-- 这里的`状态`我们不想光显示后台返回的1或者0, 而是显示一个自定义的图标 -->
        <!-- 我们要拿到enable的值才行 -->
        <!-- 这里我们使用作用域插槽 -->
        <el-table-column align="center" label="状态" prop="enable" width="90px">
          <!-- 解释一下: #default是默认的名字, 我们会拿到一个对象scope.row, 里面装的就是所有传过来的属性 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>

        <!-- 同样, 这里它后台返回的时间格式我们也不满意 -->
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="180px">
          <!-- 放置插槽 -->
          <el-button size="large" icon="Edit" type="primary" text> 编辑 </el-button>
          <el-button size="large" icon="Delete" type="danger" text> 删除 </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!-- 可以用v-model的自定义名字 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()

// 注意这一步是异步操作
systemStore.postUsersListAction()

// 2.获取usersList数据,进行展示
// 因为上一步是异步操作, 还没来结果
// 用storeToRefs包裹的东西就是响应式的, 这里用computed也可以
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
const currentPage = ref(1)
const pageSize = ref()
function handleSizeChange() {}
function handleCurrentChange() {}
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
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
