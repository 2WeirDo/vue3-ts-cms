<template>
  <div class="list">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentTableConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 将editCallback传递给usePageModal
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped></style>
