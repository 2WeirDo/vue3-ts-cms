<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <!-- 自定义这里甚至可以通过span的class写样式 -->
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

// 点击search, content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content, modal的操作
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>
