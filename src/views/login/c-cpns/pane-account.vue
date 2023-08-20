<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="55px"
      size="large"
      status-icon
      ref="formRef"
    >
      <!-- 这里的prop定义的就是相应规则的名字 -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types'

// 1.定义account数据
// 表单双向绑定这个对象
const account = reactive<IAccount>({
  name: '',
  password: ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'change'
    }
    // {
    //   min: 4,
    //   max: 20,
    //   message: ,
    //   trigger: ,
    // }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
// 泛型中传入el-form的类型
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction() {
  // validate方法 : 是否符合规则
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~')
    }
  })
}

// 暴露方法给父组件
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
