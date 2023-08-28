<template>
  <div class="user">
    <!-- user-search的自定义事件query-click -->
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewBtnClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

// 对content组件的操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
}
</style>
