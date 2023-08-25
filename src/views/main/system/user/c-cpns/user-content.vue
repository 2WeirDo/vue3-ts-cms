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
          <template #default="scope">
            <el-button size="large" icon="Edit" type="primary" text> 编辑 </el-button>
            <el-button
              size="large"
              icon="Delete"
              type="danger"
              text
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
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
import { ElMessage } from 'element-plus'

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref()

// 注意这一步是异步操作 (发送网络请求获取列表和页码数据)
// 要传入一个参数是关于页码数据的
fetchUserListData()

// 2.获取usersList数据,进行展示
// 因为上一步是异步操作, 还没来结果
// 用storeToRefs包裹的东西就是响应式的, 这里用computed也可以
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑

function handleSizeChange() {
  // 每页多少条发生变化
  fetchUserListData()
}

function handleCurrentChange() {
  // 页码变化
  fetchUserListData()
}

// 4.定义一个函数, 发送网络请求
// 由于我们不管是在初始进入还是切换页码还是切换每页多少条都会重新发送请求, 所以我们定义一个函数, 发送网络请求
// 我们还要接收一个参数是拿到的searchForm的数据
function fetchUserListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  // 发送网络请求
  const pageInfo = { size, offset }
  // 将数据合并作为请求的请求数据, 以此来获取精确列表
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}
// 5.编辑和删除的操作
function handleDelete(id: number) {
  systemStore.deleteUserByIdAction(id)
  ElMessage.success('删除成功~~')
}

// 因为在user-search组件中要使用fetchUserListData这个方法, 所以我们要把这个方法暴露出去
defineExpose({ fetchUserListData })
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
