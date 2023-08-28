<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <!--  el-form里面可以给每个input加上rules :rules="rules" 参考login页面-->
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <!-- 新增才显示密码, 编辑不显示 -->
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'

// 1.定义内部的属性
const dialogVisible = ref(false) // 是否显示弹出框
const formData = reactive<any>({
  // 由于后面遍历的时候, 这个对象上的key可能不存在这个对象上, 我们泛型就设置为any
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewRef = ref(true) // 新增还是编辑
const editData = ref()

// 2.获取roles/departments数据(部门和角色)
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 2.定义设置dialogVisible方法
// 作用: 显示新增/编辑用户页面 -- 编辑时回显数据
function setModalVisible(isNew: boolean = true, itemData?: any) {
  // 不传isNew就是新增, 传false就是编辑
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 保证传入了值才能回显
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    // 之后会拿到这一行的id进行编辑的网络请求, 所以我们要先获取到这一行的信息
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 创建新的用户
    systemStore.newUserDataAction(formData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
