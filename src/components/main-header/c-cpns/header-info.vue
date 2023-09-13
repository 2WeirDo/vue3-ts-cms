<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span @click="toolClick">
        <el-icon><Tools /></el-icon>
      </span>
      <span @click="formClick">
        <el-icon><Platform /></el-icon>
      </span>
      <span @click="storyClick">
        <el-icon><Edit /></el-icon>
      </span>
      <span @click="messageClick">
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span @click="goodsClick">
        <el-icon><Goods /></el-icon>
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <!-- 头像 -->
          <el-avatar :size="30" src="https://2weirdo.github.io/img/messi.jpg" />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </span>
        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <!-- <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'

const loginStore = useLoginStore()

const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
  ElMessage.success('您已退出成功~~')
}
function storyClick() {
  router.push('/main/story/chat')
}
function formClick() {
  router.push('/main/analysis/dashboard')
}
function messageClick() {
  router.push('/main/story/list')
}
function goodsClick() {
  router.push('/main/product/category')
}
function toolClick() {
  router.push('/main/system/user')
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: rgb(209, 7, 152);
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

// 这个样式操作有点厉害~
.info {
  // 因为直接写是覆盖不了这东西的, 所以我们要从全局去修改
  // 另外弹出来的dropdown没有渲染到app里面, 用:deep找不到
  // global是给整个html设置样式
  // 选子组件的根元素可以不用deep, 非根元素要用deep, 不是子组件要用global
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
